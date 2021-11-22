import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
	@IsString()
	@ApiProperty()
	userName: string;

	@IsString()
	@ApiProperty()
	password: string;

	@IsString()
	@ApiProperty()
	recaptcha: string;
}

export class LoginResponseDto{
	@IsNumber()
	@ApiProperty()
	statusCode: number;

	@IsString()
	@ApiProperty()
	accessToken: string;
}
