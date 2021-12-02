import { Module } from '@nestjs/common';
import { LoginModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './db.config';
import { GoogleRecaptchaModule, GoogleRecaptchaNetwork } from '@nestlab/google-recaptcha';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GoogleRecaptchaModule.forRoot({
      secretKey: '6LeV9k4dAAAAABLSl4Z7N7wYFDQd7zCP_SGOqhNc',
      response: (req) => req.body.recaptcha,
      score: 0.9
    }),
    TypeOrmModule.forRoot(DbConfig),
    LoginModule,
    UserModule
  ]
})
export class AppModule {}
