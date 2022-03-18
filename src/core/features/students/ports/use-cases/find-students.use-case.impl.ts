import { FindStudentsUseCase } from './find-students.use-case';
import { Pagination, PaginationRequest } from '../../../../commons/pagination';
import { StudentResponseDto } from '../../dtos/student-response.dto';
import { FindStudentsRepository } from '../repositories/find-students.repository';
import { ResourceNotFoundException } from '../../../../exceptions';

export class FindStudentsUseCaseImpl implements FindStudentsUseCase {
  constructor(private repository: FindStudentsRepository) {}

  public async findMany(
    pag: PaginationRequest,
  ): Promise<Pagination<StudentResponseDto[]>> {
    return this.repository.findMany(pag);
  }

  public async findOne(id: string): Promise<StudentResponseDto> {
    const student = await this.repository.findOne(id);
    if (!student) throw new ResourceNotFoundException();

    return student;
  }
}
