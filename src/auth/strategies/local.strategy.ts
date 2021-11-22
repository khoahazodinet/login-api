import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../../login/services/login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private loginService: LoginService) {
		super();
	}

	async validate(UserName: string, Password: string): Promise<any> {
		const user = await this.loginService.validateUser(UserName, Password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
