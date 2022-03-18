import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id?: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'doc_number',
    type: 'varchar',
    length: 11,
    nullable: false,
    unique: true,
  })
  docNumber: string;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: false,
  })
  birthDate: Date;

  @Column({
    name: 'created_at',
    type: 'date',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'date',
    nullable: false,
  })
  updatedAt: Date;

  constructor(student?: Partial<StudentEntity>) {
    Object.assign(this, student);
  }
}
