export class CreateStudentDto {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  docNumber: string;

  constructor(student?: Partial<CreateStudentDto>) {
    Object.assign(this, student);
  }
}
