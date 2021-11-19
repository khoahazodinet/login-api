import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { TokenDto, UserLoginDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  private dataValue = {
    name: 'Cuong Zodinet',
    username: 'cuongzdn',
    email: 'cuong@zodinet.com',
    password: '12345678',
    birthday: '01/01/1989',
  };
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  handleLogin(data: UserLoginDto): TokenDto {
    if (data.UserName !== this.dataValue.name) {
      return {} as TokenDto;
    }
    if (data.Password !== this.dataValue.password) {
      return {} as TokenDto;
    }
    this.userRepository.findOne(data.UserName).then(function (user) {
      if (user && user.Password === data.Password) {
        const payload = { UserName: data.UserName, isLogin: true };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    });
  }
}
