export class StudentResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  docNumber: string;

  constructor(student?: Partial<StudentResponseDto>) {
    Object.assign(this, student);
  }
}
