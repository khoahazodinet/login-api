import { Post, Controller, Body } from "@nestjs/common";
import { LoginService } from '../services/login.service';
import { LoginRequestDto, LoginResponseDto } from "../models/login.dto";

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { ILogin } from "../models/login.interface";

@ApiTags('AuthRecaptcha')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Recaptcha()
  @Post('recaptcha/login')
  @ApiBody({ type:  LoginRequestDto})
  login(@Body() bodyReq: LoginRequestDto): Promise<LoginResponseDto> {
    const body: ILogin = {
      UserName: bodyReq.userName,
      Password: bodyReq.password
    }
    return this.loginService.handleLogin(body);
  }
}
