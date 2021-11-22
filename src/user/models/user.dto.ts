import { IsEmail, IsNotEmpty, IsString, Length, Max, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

	@ApiProperty()
	Birthday: Date;

	@IsNotEmpty()
	@Length(1, 50)
	@ApiProperty()
	Password: string;
}

export class UpdateUserDto {
	@IsString()
	@ApiProperty()
	@ValidateIf((object, value) => value === null)
	Name!: string | null;

	@ApiProperty()
	@ValidateIf((object, value) => value === null)
	Birthday!: Date | null;

	@IsString()
	@ValidateIf((object, value) => value === null)
	@ApiProperty()
	Password!: string | null;
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
