import { FindStudentsRepositoryTestAdapter } from '../repositories/find-students.repository.test-adapter';
import { FindStudentsRepository } from '../../../../../../src/core/features/students/ports/repositories/find-students.repository';
import { FindStudentsUseCase } from '../../../../../../src/core/features/students/ports/use-cases/find-students.use-case';
import { FindStudentsUseCaseImpl } from '../../../../../../src/core/features/students/ports/use-cases/find-students.use-case.impl';
import { StudentResponseDtoFactory } from '../../../../../factories/student-response-dto.factory';
import { ResourceNotFoundException } from '../../../../../../src/core/exceptions';

describe('FindStudentsUseCaseImpl', () => {
  let findStudentsRepository: FindStudentsRepository;
  let findStudentsUseCase: FindStudentsUseCase;

  beforeEach(() => {
    findStudentsRepository = new FindStudentsRepositoryTestAdapter();
    findStudentsUseCase = new FindStudentsUseCaseImpl(findStudentsRepository);
  });

  describe('findOne', () => {
    it('should return found students', async () => {
      const studentResponse = await StudentResponseDtoFactory.build();

      jest
        .spyOn(findStudentsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(studentResponse));

      const foundStudent = await findStudentsUseCase.findOne(
        studentResponse.id,
      );

      expect(foundStudent).toBe(studentResponse);
    });

    it('should throw an exception if not found', async () => {
      jest
        .spyOn(findStudentsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        findStudentsUseCase.findOne('wrongid'),
      ).rejects.toBeInstanceOf(ResourceNotFoundException);
    });
  });
});
