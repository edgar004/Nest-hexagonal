import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../../../data/entities/student.entity';
import { FindStudentsRepositoryAdapter } from '../../../data/repositories/find-students.repository.adapter';
import { StudentsController } from '../../../http/controllers/students.controller';
import { StudentsProviders } from './students.providers';
import { Module } from '@nestjs/common';
import { CreateStudentsRepositoryAdapter } from '../../../data/repositories/create-students.repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  exports: [FindStudentsRepositoryAdapter, CreateStudentsRepositoryAdapter],
  controllers: [StudentsController],
  providers: [
    FindStudentsRepositoryAdapter,
    CreateStudentsRepositoryAdapter,
    ...StudentsProviders,
  ],
})
export class StudentsModule {}
