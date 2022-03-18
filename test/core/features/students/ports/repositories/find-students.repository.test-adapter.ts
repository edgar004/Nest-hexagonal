import { FindStudentsRepository } from '../../../../../../src/core/features/students/ports/repositories/find-students.repository';
import {
  Pagination,
  PaginationRequest,
} from '../../../../../../src/core/commons/pagination';
import { StudentResponseDto } from '../../../../../../src/core/features/students/dtos/student-response.dto';

export class FindStudentsRepositoryTestAdapter
  implements FindStudentsRepository
{
  findMany(pag: PaginationRequest): Promise<Pagination<StudentResponseDto[]>> {
    return Promise.resolve(undefined);
  }

  findOne(id: string): Promise<StudentResponseDto> {
    return Promise.resolve(undefined);
  }
}
