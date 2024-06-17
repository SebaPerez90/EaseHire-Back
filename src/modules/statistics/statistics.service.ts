import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Between,  Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async foundUsersByDays() {
    try {
      const currentDayOfWeek = moment().isoWeekday();
      const firstDayOfWeek = moment().startOf('isoWeek');
      const usersByDay = [];
      for (let day = 1; day <= currentDayOfWeek; day++) {
        const startDate = firstDayOfWeek
          .clone()
          .add(day - 1, 'days')
          .startOf('day')
          .toDate();
        const endDate = firstDayOfWeek
          .clone()
          .add(day - 1, 'days')
          .endOf('day')
          .toDate();
        const users = await this.userRepository.find({
          where: {
            datecreateUser: Between(startDate, endDate),
          },
        });
        const countUsers = users.length;
        usersByDay.push({
          day,
          countUsers,
        });
      }
      return usersByDay;
    } catch (error) {
      throw new Error('Failed to retrieve users by day in current week');
    }
  }
  async foundUserWeek() {
    try {
      const currentYear = moment().year(); 
      const currentMonth = moment().month(); 
      const firstDayOfMonth = moment({
        year: currentYear,
        month: currentMonth,
      }).startOf('month');
      const lastDayOfMonth = moment({
        year: currentYear,
        month: currentMonth,
      }).endOf('month');
      const usersByWeek = [];
      const totalWeeksInMonth = Math.ceil(lastDayOfMonth.date() / 7);
      for (let week = 0; week <= totalWeeksInMonth; week++) {    
        const startDate = firstDayOfMonth
          .clone()
          .add(week, 'weeks')
          .startOf('week')
          .toDate();
        const endDate = firstDayOfMonth
          .clone()
          .add(week, 'weeks')
          .endOf('week')
          .toDate();
        if (startDate < firstDayOfMonth.toDate()) {
          continue;
        }
        if (endDate > lastDayOfMonth.toDate()) {
          break;
        }
        const users = await this.userRepository.find({
          where: {
            datecreateUser: Between(startDate, endDate),
          },
        });
        const countUsers = users.length; 
        usersByWeek.push({
          week,
          countUsers,
        });
      }
      return usersByWeek; 
    } catch (error) {
      throw new Error(
        `Failed to retrieve users by week in current month: ${error.message}`,
      );
    }
  }
  async foundUsersByMonth() {
    try {
      const currentYear = moment().year();
      const currentMonth = moment().month();
      const months = moment.months();

      const usersByMonth = [];

      for (let month = 0; month <= currentMonth; month++) {
        const startDate = moment({ year: currentYear, month })
          .startOf('month')
          .toDate();
        const endDate = moment({ year: currentYear, month })
          .endOf('month')
          .toDate();

        const users = await this.userRepository.find({
          where: {
            datecreateUser: Between(startDate, endDate),
          },
        });

        const countUsers = users.length;

        usersByMonth.push({
          month: months[month],
          countUsers,
        });
      }
      return usersByMonth;
    } catch (error) {
      throw new Error('Failed to retrieve users by month');
    }
  }
}
