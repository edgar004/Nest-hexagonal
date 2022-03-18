import { ErrorType } from '../commons/enums/error-type';

export interface Exception {
  errorType: ErrorType;
  message: string;
  errors: any[];
}
