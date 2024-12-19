import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformer } from 'src/response/response.interceptor';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseTransformer }],
})
export class CoreModule {}
