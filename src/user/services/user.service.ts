import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { IUser } from "../models/user.interface";
import { UserResponseDto } from "../models/user.dto";
import {getConnection} from "typeorm";

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
      .where("ID = :ID", { ID: id })
      .execute();
  }
}
