import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbConfig } from "./db.config";


@Module({
  imports: [
    // ConfigModule.forRoot({isGlobal: true}),
    // TypeOrmModule.forRoot(DbConfig),
    LoginModule, UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
