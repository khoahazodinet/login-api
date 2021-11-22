import { Module } from "@nestjs/common";
import { LoginModule } from "./auth/login.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConfig } from "./db.config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DbConfig),
    LoginModule, UserModule]
})
export class AppModule {
}