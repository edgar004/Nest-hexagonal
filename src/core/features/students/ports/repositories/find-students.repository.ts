import { StudentResponseDto } from '../../dtos/student-response.dto';
import { Pagination, PaginationRequest } from '../../../../commons/pagination';

export interface FindStudentsRepository {
  findOne(id: string): Promise<StudentResponseDto>;
  findMany(pag: PaginationRequest): Promise<Pagination<StudentResponseDto[]>>;
}
