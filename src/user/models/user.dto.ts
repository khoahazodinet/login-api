import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	userName: string;

	@ApiProperty()
	birthday: Date;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	password: string;
}

export class UpdateUserDto {
	@IsString()
	@ApiProperty()
	@ValidateIf((object, value) => value === null)
	name!: string | null;

	@ApiProperty()
	@ValidateIf((object, value) => value === null)
	birthday!: Date | null;

	@IsString()
	@ValidateIf((object, value) => value === null)
	@ApiProperty()
	password!: string | null;
}

export class UpdateResponseDto {
	constructor(status: number, message: string) {
		this.statusCode = status;
		this.message = message;
	}

	@ApiProperty({ default: 200 })
	statusCode: number;

	@ApiProperty({ default: 'Successfully' })
	message: string;
}

export class UserResponseDto {
	@Length(1, 50)
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	userName: string;

	@Length(1, 50)
	@ApiProperty()
	birthday: Date;
}
