import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class AlreadyExistsException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.AlreadyExists, message);
  }
}
