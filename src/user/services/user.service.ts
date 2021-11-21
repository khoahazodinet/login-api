import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../models/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { IUser } from "../models/user.interface";
import { UserResponseDto } from "../models/user.dto";
import { response, Response } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getAllId(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException();
    return users.map((user) => {
      const { ID, Password, ...res } = user;
      return res;
    });
  }

  async getUserById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    const { ID, Password, ...res } = user;
    return res;
  }


  async create(newUser: IUser): Promise<UserResponseDto> {
    const user = await this.userRepository.save(newUser);
    if (!user) throw new ForbiddenException();
    const { ID, Password, ...res } = user;
    return res;
  }

  async updateUserById(id: number, userInfo: IUser): Promise<UpdateResult> {
    const entity = await this.userRepository.findOne(id);
    if (!entity) throw new ForbiddenException();
    return await this.userRepository.update(id, {
      Name: userInfo.Name ?? entity.Name,
      Password: userInfo.Password ?? entity.Password,
      Birthday: userInfo.Birthday ?? entity.Birthday
    });
  }
}
