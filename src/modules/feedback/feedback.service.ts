import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../../utils/mock-feedbacks.json';
import { PostFeedbackDto } from './dto/create-feedback.dto';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';
import * as forbidden_words from '../../utils/forbidden-words.json';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private userRepository: UserRepository,
  ) {}

  async seederFeedbacks() {
    data?.map(async (element) => {
      const feedback = new Feedback();
      feedback.rate = element.rate;
      feedback.description = element.description;

      await this.feedbackRepository.save(feedback);
    });
  }

  async getAllFeedbacks() {
    const feedbacks = await this.feedbackRepository.find();

    if (feedbacks.length === 0)
      throw new NotFoundException('The feedback list is still empty');

    const approvedFeedbacks: Feedback[] = [];

    feedbacks.map(async (element) => {
      if (element.blocked === true) {
        const blocked = await this.feedbackRepository.findOneBy({
          id: element.id,
        });
        approvedFeedbacks.push(blocked);
      }
    });
    return feedbacks;
  }

  async postFeedback(feedbackData: PostFeedbackDto, req) {
    const user: User = await this.userRepository.findOne(req.user.id);
    const feedback = new Feedback();
    feedback.rate = feedbackData.rate;
    feedback.description = feedbackData.description;
    feedback.user = user;

    const response = await this.check(feedbackData);

    if (response) {
      feedback.isOfensive = true;
      await this.feedbackRepository.save(feedback);
      throw new BadRequestException(response);
    }
    await this.feedbackRepository.save(feedback);
    return { message: 'You feebacks has been send successfully' };
  }

  async editFeedback(feedbackData: Partial<Feedback>, id) {
    const feebackFounded: Feedback = await this.feedbackRepository.findOneBy({
      id: id,
    });

    if (!feebackFounded)
      throw new NotFoundException('The feedback is not found or not exists');
    const feedbackUpdates = await this.feedbackRepository.merge(
      feebackFounded,
      feedbackData,
    );

    await this.feedbackRepository.save(feedbackUpdates);

    return {
      message: 'Your feeback has been update successfully',
      feebackFounded,
    };
  }

  async deleteFeedback(id) {
    const feedbackFounded = await this.feedbackRepository.findOneBy({
      id: id,
    });
    if (!feedbackFounded)
      throw new NotFoundException('The feedback was not found or not exists');

    feedbackFounded.blocked = true;
    await this.feedbackRepository.save(feedbackFounded);
    return {
      message: 'The feedback has been blocked',
      feedbackFounded,
    };
  }

  /*
   * Filtro de palabras obsenas: en caso de usar
   * algunas del json "fobidden-words.json".
   * Automaticamente la publicacion setea como agresiva.
   * la podes editar antes de que sea bloqueada por un
   * ADMIN
   */
  private async check(data) {
    const feedback = data.description.split(/\s+/);
    const words = forbidden_words.forbidden_words;
    const matches: string[] = [];

    words.map((element) => {
      for (let i = 0; i < feedback.length; i++) {
        if (feedback[i] === element) {
          matches.push(feedback[i]);
        }
      }
    });
    return {
      message:
        'Please check your comment! Remember that the applications policies do not allow words that promote violence or abuse',
      matches,
    };
  }
}
