import { ErrorType } from '../commons/enums/error-type';
import { Exception } from './exception';

export abstract class BaseException implements Exception {
  private _errorType: ErrorType = ErrorType.Unexpected;
  private _message: string;
  private _errors: any[];

  protected constructor(
    errorType: ErrorType,
    message: string = null,
    errors: string[] = null,
  ) {
    this._errorType = errorType;
    this._message = message;
    this._errors = errors;
  }

  get errorType(): ErrorType {
    return this._errorType;
  }

  set errorType(value: ErrorType) {
    this._errorType = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get errors(): any[] {
    return this._errors;
  }

  set errors(value: any[]) {
    this._errors = value;
  }
}
