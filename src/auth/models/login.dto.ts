import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class recaptchaRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  recaptcha?: string;
}

export class TokenDto {
  access_token: string;
}
