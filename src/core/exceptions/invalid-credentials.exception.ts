import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class InvalidCredentialsException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.InvalidCredentials, message);
  }
}
