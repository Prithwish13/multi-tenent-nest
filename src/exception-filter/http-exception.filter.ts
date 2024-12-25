import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(
      `${request.method} ${request.originalUrl} ${status} \n error: ${exception.message}`,
    );
    const errorDetails =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: 'Something bad happened',
            error: 'Internal Server Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };

    response.status(status).json({
      error: true,
      errorDetails,
    });
  }
}
