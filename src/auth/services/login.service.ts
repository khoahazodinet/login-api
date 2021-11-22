import { Injectable } from '@nestjs/common';
import { TokenDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { IUser } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser(UserName: string, Password: string): Promise<any> {
		const result = await this.userService.getUserByUserName(UserName);
		if (result && result.length > 1) return null;

		const user = result[0];

		if (user && await bcrypt.compare(Password, user.Password)) {
			const { Password, ...result } = user;
			return result;
		}
		return null;
	}

	handleLogin(data: IUser): TokenDto {
		const payload = { UserName: data.UserName, sub: data.ID };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserEntity } from '../../user/entities/user.entity';
// import { Repository } from 'typeorm';
// import { IUser } from '../../user/models/user.interface';

// @Injectable()
// export class LoginService {
// 	constructor(
// 		@InjectRepository(UserEntity)
// 		private readonly userRepository: Repository<UserEntity>
// 	) {}

// 	async findOne(condition: { [key: string]: any }): Promise<IUser> {
// 		return this.userRepository.findOne(condition);
// 	}
// }
