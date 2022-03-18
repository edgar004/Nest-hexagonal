import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class UnexpectedErrorException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.Unexpected, message);
  }
}
