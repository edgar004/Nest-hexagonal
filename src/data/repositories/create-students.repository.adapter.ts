import { QueryFailedError, Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { CustomRepository } from '../../main/commons/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from '../../core/features/students/dtos/create-student.dto';
import { StudentMapper } from '../mappers/student.mapper';
import { StudentResponseDto } from '../../core/features/students/dtos/student-response.dto';
import {
  AlreadyExistsException,
  UnexpectedErrorException,
} from '../../core/exceptions';
import { constraintsErrorsMapping } from '../constraints-errors.mapping';

@CustomRepository()
export class CreateStudentsRepositoryAdapter {
  constructor(
    @InjectRepository(StudentEntity)
    private repository: Repository<StudentEntity>,
  ) {}

  public async createOne(
    student: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const entity = StudentMapper.toEntity(student);
    try {
      const created = await this.repository.save(entity);

      return StudentMapper.toResponseDto(created);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e.driverError?.constraint) {
          const errorMsg =
            constraintsErrorsMapping[e.driverError.constraint] || '';

          throw new AlreadyExistsException(errorMsg);
        }
      }
      throw new UnexpectedErrorException();
    }
  }
}
