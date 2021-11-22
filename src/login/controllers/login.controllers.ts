import { Post, Controller, Request, UseGuards, Get } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginRequestDto, TokenDto } from '../models/login.dto';

import { LocalAuthGuard } from '../guards/local.auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';

@ApiTags('Auth')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Recaptcha()
  @UseGuards(LocalAuthGuard)
  @Post('recaptcha/login')
  @ApiBody({ type:  LoginRequestDto})
  login(@Request() req): TokenDto {
    return this.loginService.handleLogin(req.user);
  }
  
}
