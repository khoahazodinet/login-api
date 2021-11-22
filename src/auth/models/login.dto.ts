import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
	@IsString()
	@ApiProperty()
	username: string;

	@IsString()
	@ApiProperty()
	password: string;
}

export class TokenDto {
	access_token: string;
}
