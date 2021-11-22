import { IsString } from 'class-validator';
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


