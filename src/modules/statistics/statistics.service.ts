import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Between,  Repository } from 'typeorm';
import * as moment from 'moment';
import { Publicaction } from 'src/database/entities/publication.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Publicaction)
    private publicationRepository: Repository<Publicaction>
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
  async foundPublicationByMonth() {
    try {
      const publications = await this.publicationRepository.find()
      console.log(`las publication is ${publications}`);
      
      publications.map((publication) => {
        publication.date = moment(publication.date).format('YYYY-MM-DD')
      })
      const currentYear = moment().year();
      const currentMonth = moment().month();
      const months = moment.months();
      console.log(publications);
      
      const PublicationByMoth = [];
      
      for (let month = 0; month <= currentMonth; month++) {
        const startDate = moment({ year: currentYear, month })
        .startOf('month')
        .toDate();
        const endDate = moment({ year: currentYear, month })
        .endOf('month')
        .toDate();
        
        const publication = await this.publicationRepository.find({
          where: {
            date: Between(startDate, endDate),
          },
        });

        const countPublication = publication.length;
        
        PublicationByMoth.push({
          month: months[month],
          countPublication,
        });
      }
      return PublicationByMoth;
    } catch (error) {
      throw new Error('Failed to retrieve publication by month');
    }
  }
  async foundPublicationWeek() {
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
      const publicationByWeek = [];
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
        const users = await this.publicationRepository.find({
          where: {
            date: Between(startDate, endDate),
          },
        });
        const countPublications = users.length; 
        publicationByWeek.push({
          week,
          countPublications,
        });
      }
      return publicationByWeek; 
    } catch (error) {
      throw new Error(
        `Failed to retrieve publication by week in current month: ${error.message}`,
      );
    }
  }
  async foundPublicationByDays() {
    try {
      const currentDayOfWeek = moment().isoWeekday();
      const firstDayOfWeek = moment().startOf('isoWeek');
      const publicationByDay = [];
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
        const publication = await this.publicationRepository.find({
          where: {
            date: Between(startDate, endDate),
          },
        });
        const countpublication = publication.length;
        publicationByDay.push({
          day,
          countpublication,
        });
      }
      return publicationByDay;
    } catch (error) {
      throw new Error('Failed to retrieve users by day in current week');
    }
  }
}
