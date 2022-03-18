import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorType } from '../../core/commons/enums/error-type';

export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = +exception.getStatus();
    let altErrorType = ErrorType.Unexpected;
    const { errorType, payload, message } = exception.getResponse() as {
      errorType: ErrorType;
      payload: any;
      message: any;
    };

    if (!errorType) {
      if (status === 400) {
        altErrorType = ErrorType.BadRequest;
      } else if (status === 401) {
        altErrorType = ErrorType.Unauthorized;
      } else if (status === 403) {
        altErrorType = ErrorType.Forbidden;
      } else if (status === 404) {
        altErrorType = ErrorType.NotFound;
      }
    }

    response.status(status).json({
      errorType: errorType || altErrorType,
      message: message,
      payload: payload,
      timestamp: new Date().getTime(),
    });
  }
}
