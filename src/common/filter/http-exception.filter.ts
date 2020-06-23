import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from '../expection/api.expection';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message =
      exception instanceof ApiException
        ? exception.getErrorMessage()
        : exception.response.message;
    const code =
      exception instanceof ApiException ? exception.getErrorCode() : status;
    response.status(status).json({
      code: code,
      message: message,
    });
  }
}
