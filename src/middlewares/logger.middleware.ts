import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();

    req.on('end', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      this.logger.log(
        `${method} ${url} ${statusCode} - ${resTime - reqTime} ms`,
      );
    });
    next();
  }
}
