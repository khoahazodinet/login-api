import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(UserName: string, Password: string): Promise<any> {
    const result = await this.userService.getUserByUserName(UserName);
    if (result && result.length > 1) return null;

    const user = result[0];

    if (user && (await bcrypt.compare(Password, user.Password))) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async handleLogin(data: LoginRequestDto) {
    const user = await this.userService.findOne({ UserName: data.userName });
    if (!user) {
      throw new BadRequestException('Information is invalid.');
    }
    console.log('user', user);
    if (await bcrypt.compare(data.password, user.Password)) {
      const { ID, ...result } = user;
      const payload = { userName: data.userName, sub: ID };

      return this.jwtService.signAsync(payload);
    }
    throw new UnauthorizedException('password is invalid.');
  }
}
