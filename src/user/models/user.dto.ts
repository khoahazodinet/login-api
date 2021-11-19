import {IsNotEmpty, Length, IsEmail} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @Length(0, 50)
  name: string;

  @IsNotEmpty()
  @Length(0, 50)
  userName: string;

  @Length(0, 50)
  birthday: string

  @IsNotEmpty()
  @Length(0, 50)
  password: string
}


