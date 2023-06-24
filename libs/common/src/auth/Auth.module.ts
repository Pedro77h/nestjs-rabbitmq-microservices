import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AUTH_SERVICE } from './service';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  providers: [JwtAuthGuard],
  exports: [RmqModule, JwtAuthGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
