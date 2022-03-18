import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StudentResponseDto } from '../../core/features/students/dtos/student-response.dto';
import { translateException } from '../exceptions';
import { FindStudentsUseCase } from '../../core/features/students/ports/use-cases/find-students.use-case';
import { CreateStudentsUseCase } from '../../core/features/students/ports/use-cases/create-students.use-case';
import { CreateStudentDto } from '../../core/features/students/dtos/create-student.dto';
import { PaginationParams } from '../decorators';
import { Pagination, PaginationRequest } from '../../core/commons/pagination';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject('findStudents')
    private readonly findStudentsUseCase: FindStudentsUseCase,
    @Inject('createStudents')
    private readonly createStudentsUseCase: CreateStudentsUseCase,
  ) {}

  @Get()
  public async getMany(
    @PaginationParams() pag: PaginationRequest,
  ): Promise<Pagination<StudentResponseDto>> {
    try {
      return await this.findStudentsUseCase.findMany(pag);
    } catch (e) {
      translateException(e);
    }
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<StudentResponseDto> {
    try {
      return await this.findStudentsUseCase.findOne(id);
    } catch (e) {
      translateException(e);
    }
  }

  @Post()
  public async createOne(
    @Body() student: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    try {
      return await this.createStudentsUseCase.createOne(student);
    } catch (e) {
      translateException(e);
    }
  }
}
