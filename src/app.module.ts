import { Module } from "@nestjs/common";
import { LoginModule } from "./auth/login.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConfig } from "./db.config";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { reCaptLoginModule } from "./login/login.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GoogleRecaptchaModule.forRoot({
      secretKey: `6LeV9k4dAAAAABLSl4Z7N7wYFDQd7zCP_SGOqhNc`,
      response: req => req.body.recaptcha,
      actions: ['SignUp', 'SignIn'],
      score: 0.1
    }),
    TypeOrmModule.forRoot(DbConfig),
    LoginModule,
    UserModule,
    reCaptLoginModule
  ]
})
export class AppModule {
}
