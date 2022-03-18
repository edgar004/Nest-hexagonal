import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class TokenExpiredException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.TokenExpired, message);
  }
}
