import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleAsyncOptions } from './config/mongo.config';
import { ProductModule } from './product/product.module';
import { TenantModule } from './tenant/tenant.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import mainConfiguration from 'src/config/main.config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      load: [mainConfiguration],
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    ProductModule,
    TenantModule,
    CoreModule,
    // AuthModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000,
      store: redisStore,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
