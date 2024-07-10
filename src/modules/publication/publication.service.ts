import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from 'src/enum/notification.enum';
// import toStream = require('buffer-to-stream');
import * as data from '../../utils/mock-publications.json';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class PublicationService implements OnModuleInit {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private notificationService: NotificationsService,
  ) {}

  async findAll() {
    const publications = await this.publicationsRepository.find();

    publications.forEach((publication) => {
      const { date, time } = publication;
      const datetime = `${date} ${time}`;
      const timelapsed = moment(datetime, 'YYYY-MM-DD HH:mm:ss').fromNow(true);

      const newPublication = new Publicaction();
      newPublication.id = publication.id;
      newPublication.title = publication.title;
      newPublication.description = publication.description;
      newPublication.profesion = publication.profesion;
      newPublication.imgUrl = publication.imgUrl;
      newPublication.date = publication.date;
      newPublication.time = publication.time;
      newPublication.timelapse = timelapsed;
      this.publicationsRepository.save(newPublication);
    });

    return await this.publicationsRepository.find();
  }

  async findPublications(
    category: string,
    city: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (category && city) {
      where.category = category;
      where.location = city;
    } else if (category) {
      where.category = category;
    } else if (city) {
      where.location = city;
    }

    const [publicationsFind, count] =
      await this.publicationsRepository.findAndCount({
        relations: {
          user: true,
          usersList: true,
        },
        where,
        take: limit,
        skip: skip,
      });

    if (publicationsFind.length === 0)
      throw new NotFoundException(`No users were found whith those parameters`);

    return { publicationsFind, count };
  }

  async findAllPremium() {
    const publications = await this.publicationsRepository.find();
    const premium = publications.filter(
      (publications) => publications.premium === true,
    );
    return premium;
  }

  async findAllPublications() {
    const [publicationsFind, count] =
      await this.publicationsRepository.findAndCount({
        relations: { user: true },
      });
    return { publicationsFind, count };
  }

  findOnePublication(id: string) {
    return this.publicationsRepository.find({
      where: { id },
      relations: { user: true },
    });
  }

  onModuleInit() {
    this.seederPublicactions();
  }
  async seederPublicactions() {
    const users = await this.userRepository.find();
    // const professions = await this.profesionsRepository.getAllProfessions();

    data?.map(async (element) => {
      const date = new Date();
      const timelapsed = moment(date).fromNow();
      const newPublication = new Publicaction();
      const formatTime = date.toLocaleTimeString();

      newPublication.title = element.title;
      newPublication.description = element.description;
      newPublication.category = element.category;
      newPublication.location = element.location;
      newPublication.remoteWork = element.remoteWork;
      newPublication.imgUrl = element.imgUrl;
      newPublication.date = element.date;
      newPublication.time = formatTime;
      newPublication.timelapse = timelapsed;
      // newPublication.profesion = professions[Math.round(Math.random() * 16)];
      newPublication.user = users[Math.round(Math.random() * 30)];

      await this.publicationsRepository
        .createQueryBuilder()
        .insert()
        .into(Publicaction)
        .values(newPublication)
        .execute();
    });
  }
  async listMe(id: string, userid: string) {
    const publication = await this.publicationsRepository.findOne({
      where: { id: id },
      relations: { user: true, usersList: true },
    });
    if (!publication) throw new NotFoundException(`not found publication`);

    const userFind = await this.userRepository.findOne({
      where: { id: userid },
    });
    if (!userFind) throw new NotFoundException(`not found user`);

    if (publication.usersList.find((user) => user.id === userid))
      return `Already applied`;

    publication.usersList = [...publication.usersList, userFind];

    this.notificationService.postNotification(
      NotificationType.SEND_APPLY_REQUEST,
      publication.user,
    );

    const publicationUpdate =
      await this.publicationsRepository.save(publication);

    return publicationUpdate;
  }

  // async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
  //   return new Promise((resolve, reject) => {
  //     const upload = v2.uploader.upload_stream(
  //       { resource_type: 'auto' },
  //       (error, result) => {
  //         if (result) {
  //           resolve(result);
  //         } else {
  //           reject(error);
  //         }
  //       },
  //     );
  //     toStream(file.buffer).pipe(upload);
  //   });
  // }

  // async create(createPublication: CreatePublicationDto, res, userid: any) {
  //   if (res) {
  //     res = res.secure_url;
  //   }
  //   const date = moment();
  //   const formatDate = date.format('YYYY-MM-DD');
  //   const formatTime = date.format('HH-mm-ss');
  //   const newPublication = await this.publicationsRepository.create({
  //     title: createPublication.title,
  //     description: createPublication.description,
  //     imgUrl: res,
  //     remoteWork: createPublication.remoteWork,
  //     category: createPublication.category,
  //     location: createPublication.location,
  //     user: userid,
  //     date: formatDate,
  //     time: formatTime,
  //   });
  //   const timelapsed = moment(date).fromNow();
  //   newPublication.timelapse = timelapsed;
  //   console.log(newPublication);

  //   const publications = await this.publicationsRepository.save(newPublication);
  //   return publications;
  // }
}
