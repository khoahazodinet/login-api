import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { IUser } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser(UserName: string, Password: string): Promise<any> {
		const result = await this.userService.getUserByUserName(UserName);
		if (result && result.length > 1) {
			throw new BadRequestException('Invalid user');
		}

		const user = result[0];

		if (user && await bcrypt.compare(Password, user.Password)) {
			const { Password, ...result } = user;
			return result;
		}
		{
			throw new BadRequestException('Invalid password');
		}
	}

	async handleLogin(data: IUser) {
		const user = await this.userService.findOne({UserName: data.UserName})
		if(!user) throw new BadRequestException('Wrong user');

		if(!await bcrypt.compare(data.Password, user.Password)){
			throw new BadRequestException('Wrong password')
		}

		const payload = { UserName: data.UserName, sub: data.ID };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}