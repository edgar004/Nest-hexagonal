import { FindStudentsRepository } from '../../core/features/students/ports/repositories/find-students.repository';
import { Pagination, PaginationRequest } from '../../core/commons/pagination';
import { StudentResponseDto } from '../../core/features/students/dtos/student-response.dto';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { UnexpectedErrorException } from '../../core/exceptions';
import { StudentMapper } from '../mappers/student.mapper';
import { CustomRepository } from '../../main/commons/decorators';
import { InjectRepository } from '@nestjs/typeorm';

@CustomRepository()
export class FindStudentsRepositoryAdapter implements FindStudentsRepository {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>,
  ) {}

  public async findOne(id: string): Promise<StudentResponseDto> {
    try {
      const student = await this.repository.findOne(id);
      if (!student) return null;

      return StudentMapper.toResponseDto(student);
    } catch (e) {
      throw new UnexpectedErrorException();
    }
  }

  public async findMany(
    pag: PaginationRequest,
  ): Promise<Pagination<StudentResponseDto[]>> {
    const { skip, size: take, order } = pag;
    const count = await this.repository.count();
    if (count === 0) return Pagination.of(pag, 0, []);

    const entities = await this.repository.find({ skip, take, order });
    if (entities.length == 0) return Pagination.of(pag, count, []);

    const users = await Promise.all(entities.map(StudentMapper.toResponseDto));

    return Pagination.of(pag, count, users);
  }
}
