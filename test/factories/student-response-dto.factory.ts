import * as Factory from 'factory.ts';
import { name, datatype } from 'faker';
import { StudentResponseDto } from '../../src/core/features/students/dtos/student-response.dto';
const { makeFactory, each } = Factory.Async;

export const StudentResponseDtoFactory = makeFactory<StudentResponseDto>({
  id: each(() => datatype.uuid()),
  firstName: each(() => name.firstName(1)),
  lastName: each(() => name.lastName(1)),
  birthDate: new Date(),
});
