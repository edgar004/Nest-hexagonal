import { BaseException } from './index';
import { ErrorType } from '../commons/enums/error-type';

export class NotAuthenticatedException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.Unauthorized, message);
  }
}
