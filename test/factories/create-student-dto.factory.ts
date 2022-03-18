import { each, makeFactory } from 'factory.ts';
import { CreateStudentDto } from '../../src/core/features/students/dtos/create-student.dto';
import { name, datatype } from 'faker';

export const CreateStudentDtoFactory = makeFactory<CreateStudentDto>({
  id: each(() => datatype.uuid()),
  firstName: each(() => name.firstName(1)),
  lastName: each(() => name.lastName(1)),
  birthDate: new Date(),
});
