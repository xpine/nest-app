//  api异常类
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiCode } from '../enum/api-code.num';

export class ApiException extends HttpException {
  private errorMessage: string;
  private errorCode: ApiCode;

  constructor(
    statusCode: HttpStatus,
    errorCode: ApiCode,
    errorMessage: string,
  ) {
    super(errorMessage, statusCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
