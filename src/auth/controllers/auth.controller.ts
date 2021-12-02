import { Post, Controller, Request, UseGuards, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginRequestDto, recaptchaRequestDto, TokenDto } from '../models/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { Recaptcha } from '@nestlab/google-recaptcha';
// import { LocalAuthGuard } from '../guards/local.auth.guard';
@ApiTags('Auth')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('auth/login')
  @ApiBody({ type: LoginRequestDto })
  login(@Body() data: LoginRequestDto) {
    console.log('post', data);
    return this.loginService.handleLogin(data);
  }

  // @UseGuards(LocalAuthGuard)
  @Recaptcha()
  @Post('recaptcha/login')
  @ApiBody({ type: recaptchaRequestDto })
  recapchaLogin(@Body() data: LoginRequestDto) {
    console.log(data);
    return this.loginService.handleLogin(data);
  }
}
