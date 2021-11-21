import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./services/login.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [UserModule,
    JwtModule.register({
      secret: "abcd",
      signOptions: { expiresIn: "60s" }
    }),
    ConfigModule
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {
}
