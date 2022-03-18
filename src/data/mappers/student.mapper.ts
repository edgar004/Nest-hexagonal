import { StudentEntity } from '../entities/student.entity';
import { StudentResponseDto } from '../../core/features/students/dtos/student-response.dto';
import { CreateStudentDto } from '../../core/features/students/dtos/create-student.dto';

export class StudentMapper {
  static toResponseDto(entity: StudentEntity): StudentResponseDto {
    return new StudentResponseDto(entity);
  }

  static toEntity(dto: CreateStudentDto) {
    return new StudentEntity(dto);
  }
}
