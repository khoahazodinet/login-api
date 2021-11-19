import { Body, Post, Controller, Get } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { UserLoginDto, TokenDto } from '../models/login.dto';
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('login')
  handleLogin(@Body() data: UserLoginDto): TokenDto {
    console.log(data);
    return {} as TokenDto;
  }
}
