import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Headers,
  NotFoundException,
} from "@nestjs/common";
import { ProfesionsService } from "./profesions.service";
import { CreateProfesionDto } from "./dto/create-profesion.dto";
import { UpdateProfesionDto } from "./dto/update-profesion.dto";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";
import { Public } from "src/decorators/is-public.decorator";

@ApiTags("profesions")
@Controller("profesions")
export class ProfesionsController {
  constructor(
    private readonly profesionsService: ProfesionsService,
    private jwtService: JwtService
  ) {}

  @Get()
  @Public()
  findProfesions() {
    return this.profesionsService.findProfesions();
  }

  @Get("me")
  async findMe(@Headers() header) {
    const secret = process.env.JWT_SECRET;
    const { userid } = this.jwtService.verify(header.authorization, { secret });
    return await this.profesionsService.findMe(userid);
  }

  @Post("me/:id")
  @Public()
  meProfesion(@Param("id") id: string, @Body() body: CreateProfesionDto) {
    return this.profesionsService.meProfesion(id, body);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createProfesionDto: CreateProfesionDto, @Headers() header) {
    const secret = process.env.JWT_SECRET;
    const { userid } = this.jwtService.verify(header.authorization, { secret });

    return this.profesionsService.create(createProfesionDto, userid);
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  update(
    @Param("id") id: string,
    @Body() updateProfesionDto: UpdateProfesionDto
  ) {
    return this.profesionsService.update(id, updateProfesionDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  async remove(@Param("id") id: string) {
    try {
      return await this.profesionsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Profesion with ID ${id} not found`);
    }
  }
}
