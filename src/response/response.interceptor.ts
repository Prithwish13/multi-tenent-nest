import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { DataResponse, MessageResponse, StatusCode } from './response';
import { Request } from 'express';

@Injectable()
export class ResponseTransformer implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.headers);
    return next.handle().pipe(
      map((data) => {
        if (data instanceof MessageResponse) return data;
        if (data instanceof DataResponse) return data;
        if (typeof data == 'string')
          return new MessageResponse(StatusCode.SUCCESS, data);
        return new DataResponse(StatusCode.SUCCESS, 'success', data);
      }),
    );
  }
}
