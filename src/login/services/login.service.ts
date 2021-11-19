import { Injectable } from '@nestjs/common';
import { UserLoginDto } from '../models/login.dto';

@Injectable()
export class LoginService {
  private dataValue = {
    name: 'Cuong Zodinet',
    username: 'cuongzdn',
    email: 'cuong@zodinet.com',
    password: '12345678',
    birthday: '01/01/1989',
  };
  handleLogin(data: UserLoginDto) {
    if (data.username !== this.dataValue.name) {
      return 0;
    }
    if (data.password !== this.dataValue.password) {
      return 0;
    }

    return 1;
  }
}
