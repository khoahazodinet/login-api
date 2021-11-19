import {IsNotEmpty, Length, IsEmail} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @Length(1, 50)
  name: string;


}


