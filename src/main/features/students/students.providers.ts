import { FactoryProvider } from '@nestjs/common';
import { FindStudentsRepository } from '../../../core/features/students/ports/repositories/find-students.repository';
import { FindStudentsRepositoryAdapter } from '../../../data/repositories/find-students.repository.adapter';
import { FindStudentsUseCaseImpl } from '../../../core/features/students/ports/use-cases/find-students.use-case.impl';
import { CreateStudentsRepository } from '../../../core/features/students/ports/repositories/create-students.repository';
import { CreateStudentsUseCaseImpl } from '../../../core/features/students/ports/use-cases/create-students.use-case.impl';
import { CreateStudentsRepositoryAdapter } from '../../../data/repositories/create-students.repository.adapter';

export const StudentsProviders: FactoryProvider[] = [
  {
    provide: 'findStudents',
    useFactory: (repository: FindStudentsRepository) =>
      new FindStudentsUseCaseImpl(repository),
    inject: [FindStudentsRepositoryAdapter],
  },
  {
    provide: 'createStudents',
    useFactory: (repository: CreateStudentsRepository) =>
      new CreateStudentsUseCaseImpl(repository),
    inject: [CreateStudentsRepositoryAdapter],
  },
];
