/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { from, Observable } from 'rxjs';
import { CreateUserDto } from '../models/user.dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IUser } from '../models/user.interface';
import { UserResponseDto } from '../models/user.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getAllId(): Promise<IUser[]> {
		const users = await this.userRepository.find();
		if (!users) throw new NotFoundException();
		return users.map((user) => {
			const { ID, Password, ...res } = user;
			return res;
		});
	}

	async getUserById(id: number): Promise<IUser | undefined> {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new NotFoundException();
		const { ID, Password, ...res } = user;
		return res;
	}

	async create(newUser: IUser): Promise<IUser> {
		const user = await this.userRepository.save(newUser);
		if (!user) throw new ForbiddenException();
		const { ID, Password, ...res } = user;
		return res;
	}

	async updateUserById(id: number, userInfo: IUser) {
		const user = await this.userRepository.findOne(id);
		return await getConnection()
			.createQueryBuilder()
			.update(UserEntity)
			.set({
				Name: userInfo.Name ? userInfo.Name : user.Name,
				Birthday: userInfo.Birthday ? userInfo.Birthday : user.Birthday,
				Password: userInfo.Password ? userInfo.Password : user.Password,
			})
			.where('ID = :ID', { ID: id })
			.execute();
	}
	async getUserByUserName(userName: string) {
		const result = await this.userRepository.find({ UserName: userName });
		return result;
	}

	async deleteUserById(id: number): Promise<void> {
		await this.userRepository.delete({ ID: id });
	}
}
