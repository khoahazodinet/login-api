import { Post, Controller, Request, UseGuards } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { TokenDto } from '../models/login.dto';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../local.auth.guard';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req): TokenDto {
    return this.loginService.handleLogin(req.user);
  }
}
