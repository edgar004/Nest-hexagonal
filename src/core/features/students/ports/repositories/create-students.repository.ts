import { CreateStudentDto } from '../../dtos/create-student.dto';
import { StudentResponseDto } from '../../dtos/student-response.dto';

export interface CreateStudentsRepository {
  createOne(student: CreateStudentDto): Promise<StudentResponseDto>;
  createMany(students: CreateStudentDto[]): Promise<StudentResponseDto[]>;
}
