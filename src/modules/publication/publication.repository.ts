import { InjectRepository } from "@nestjs/typeorm";
import { Publicaction } from "src/database/entities/publication.entity";
import { Repository } from "typeorm";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { NotFoundException, OnModuleInit } from "@nestjs/common";
import { UpdateProfesionDto } from "../profesions/dto/update-profesion.dto";
import { UserRepository } from "../users/users.repository";
import * as moment from "moment";
import * as data from "../../utils/mock-publications.json";
import { ProfesionsRepository } from "../profesions/profesions.repository";
import { UploadApiResponse, v2 } from "cloudinary";
import toStream = require("buffer-to-stream");

export class PublicationsRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
    private userRepository: UserRepository,
    private profesionsRepository: ProfesionsRepository
  ) {}

  async findAllId(userid: any) {
    console.log(`estamos en repository y el id es ${userid}`);

    try {
      const userpublicationsId = await this.publicationsRepository.find({
        where: { user: { id: userid } },
      });
      // if(!userpublicationsId)throw new BadRequestException(`not found user`)
      // console.log(userpublicationsId);
      return userpublicationsId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  onModuleInit() {
    this.seederPublicactions();
  }
  async seederPublicactions() {
    const users = await this.userRepository.findAll();
    const professions = await this.profesionsRepository.getAllProfessions();

    data?.map(async (element) => {
      const date = new Date();
      const timelapsed = moment(date).fromNow();
      const newPublication = new Publicaction();
      const formatDate = date.toLocaleDateString();
      const formatTime = date.toLocaleTimeString();

      newPublication.title = element.title;
      newPublication.description = element.description;
      newPublication.category = element.category;
      newPublication.location = element.location;
      newPublication.remoteWork = element.remoteWork;
      newPublication.imgUrl = element.imgUrl;
      newPublication.date = formatDate;
      newPublication.time = formatTime;
      newPublication.timelapse = timelapsed;
      newPublication.profesion = professions[Math.round(Math.random() * 16)];
      newPublication.user = users[Math.round(Math.random() * 30)];

      await this.publicationsRepository
        .createQueryBuilder()
        .insert()
        .into(Publicaction)
        .values(newPublication)
        .execute();
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async create(createPublication: CreatePublicationDto, res, userid: any) {
    const date = new Date();
    const formatDate = date.toLocaleDateString();
    const formatTime = date.toLocaleTimeString();

    const newPublication = await this.publicationsRepository.create({
      title: createPublication.title,
      description: createPublication.description,
      imgUrl: res.secure_url,
      remoteWork: createPublication.remoteWork,
      category: createPublication.category,
      location: createPublication.location,
      user: userid,
      date: formatDate,
      time: formatTime,
    });

    console.log(createPublication);

    const timelapsed = moment(date).fromNow();
    newPublication.timelapse = timelapsed;

    const publications = await this.publicationsRepository.save(newPublication);
    return publications;
  }

  async findAll() {
    const publications = await this.publicationsRepository.find();

    publications.forEach((publication) => {
      const { date, time } = publication;
      const datetime = `${date} ${time}`;
      const timelapsed = moment(datetime, "DD/MM/YYYY HH:mm:ss").fromNow(true);

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
      console.log(timelapsed);
    });

    return await this.publicationsRepository.find();
  }
  async findPrublications(
    category: string,
    city: string,
    page: number,
    limit: number
  ) {
    const skip = (page - 1) * limit;

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
        },
        where,
        take: limit,
        skip: skip,
      });

    if (publicationsFind.length === 0)
      throw new NotFoundException(`No users were found whith those parameters`);

    return { publicationsFind, count };
  }

  async findAllPublications() {
    const [publicationsFind, count] =
      await this.publicationsRepository.findAndCount({
        relations: { user: true },
      });
    return { publicationsFind, count };
  }

  async update(id: string, updatePublication: UpdateProfesionDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: string) {
    return await this.publicationsRepository.delete(id);
  }

  findOnePublication(id: string) {
    return this.publicationsRepository.find({
      where: { id },
      relations: { user: true },
    });
  }

  async findAllCategories() {
    const publications = await this.publicationsRepository.find();

    const category = publications.map(
      ({ category, ...publications }) => category
    );
    const categoryReturn = [...new Set(category)];

    const location = publications.map(
      ({ location, ...publications }) => location
    );
    const locationReturn = [...new Set(location)];

    return { categoryReturn, locationReturn };
  }
}
