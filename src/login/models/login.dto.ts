import { IsEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmpty()
  @IsString()
  UserName: string;
  @IsEmpty()
  @IsString()
  Password: string;
}
export class TokenDto {
  access_token: string;
}
