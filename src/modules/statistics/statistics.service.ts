import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async founduserweek() {
    try {
      const lastweek = moment().subtract(7, 'days').toDate();

      const users = await this.userRepository.find({
        where: { datecreateUser: MoreThan(lastweek) },
      });
      const countUser = users.length;

      console.log(users);

      return countUser;
    } catch (error) {
      throw new Error('Failed to retrieve users');
    }
  }
}
