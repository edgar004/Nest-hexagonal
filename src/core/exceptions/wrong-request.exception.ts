import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class WrongRequestException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.BadRequest, message);
  }
}
