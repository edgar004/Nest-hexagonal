import { BaseException } from './base.exception';
import { ErrorType } from '../commons/enums/error-type';

export class ResourceNotFoundException extends BaseException {
  constructor(message?: string) {
    super(ErrorType.NotFound, message);
  }
}
