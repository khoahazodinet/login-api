import { Module } from "@nestjs/common";
import { LoginModule } from "./auth/login.module";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { reCaptLoginModule } from "./login/login.module";
import configuration from "./config/configuration";


@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    GoogleRecaptchaModule.forRoot({
      secretKey: `6LeV9k4dAAAAABLSl4Z7N7wYFDQd7zCP_SGOqhNc`,
      response: req => req.body.recaptcha,
      actions: ['SignUp', 'SignIn'],
      score: 0.1
    }),
    ConfigModule.forRoot({
      envFilePath: [`environments/.env.${process.env.NODE_ENV}`],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['dist/**/entities/*.entity.js'],
        synchronize: configService.get('database.sync'),
        ssl: configService.get('database.ssl'),
        extra:
          configService.get('database.ssl') === true
            ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
            : {},
      }),
    }),
    LoginModule,
    UserModule,
    reCaptLoginModule
  ]
})
export class AppModule {
}
