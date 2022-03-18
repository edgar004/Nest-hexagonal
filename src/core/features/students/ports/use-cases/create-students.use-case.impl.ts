import { CreateStudentsRepository } from '../repositories/create-students.repository';
import { CreateStudentDto } from '../../dtos/create-student.dto';
import { StudentResponseDto } from '../../dtos/student-response.dto';
import { CreateStudentsUseCase } from './create-students.use-case';

export class CreateStudentsUseCaseImpl implements CreateStudentsUseCase {
  constructor(private createStudentsRepository: CreateStudentsRepository) {}

  createMany(students: CreateStudentDto[]): Promise<StudentResponseDto[]> {
    return this.createStudentsRepository.createMany(students);
  }

  createOne(student: CreateStudentDto): Promise<StudentResponseDto> {
    return this.createStudentsRepository.createOne(student);
  }
}
