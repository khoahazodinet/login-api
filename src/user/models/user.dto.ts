import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  Email: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  Name: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  UserName: string;

  @Length(1, 50)
  @ApiProperty()
  Birthday: Date;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  Password: string;
}

export class UpdateUserDto {
  @Length(1, 50)
  @ApiProperty()
  Name: string;

  @Length(1, 50)
  @ApiProperty()
  Birthday: Date;

  @Length(1, 50)
  @ApiProperty()
  Password: string;
}

export class UpdateResponseDto{
  @ApiProperty({default: 200})
  statusCode: number;

  @ApiProperty({default: 'Successfully'})
  message: string;
}

export class UserResponseDto {
  @Length(1, 50)
  @ApiProperty()
  Email: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  Name: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  UserName: string;

  @Length(1, 50)
  @ApiProperty()
  Birthday: Date;
}



