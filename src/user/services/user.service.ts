import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { getConnection, Repository } from "typeorm";
import { IUser } from "../models/user.interface";
import { UserResponseDto } from "../models/user.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getAllId(): Promise<UserResponseDto[] | undefined> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException();
    return users.map((user) => {
      const { ID, Password, ...res } = user;
      return {
        email: res.Email,
        name: res.Name,
        userName: res.UserName,
        birthday: res.Birthday
      };
    });
  }

  async getUserById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    const { ID, Password, ...res } = user;
    return {
      email: res.Email,
      name: res.Name,
      userName: res.UserName,
      birthday: res.Birthday
    };
  }

  async create(newUser: IUser): Promise<UserResponseDto> {
    const user = await this.userRepository.save(newUser);
    if (!user) throw new ForbiddenException();
    const { ID, Password, ...res } = user;
    return {
      email: res.Email,
      name: res.Name,
      userName: res.UserName,
      birthday: res.Birthday
    };
  }

  async updateUserById(id: number, userInfo: IUser) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new ForbiddenException();
    }
    return await getConnection()
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        Name: userInfo.Name ? userInfo.Name : user.Name,
        Birthday: userInfo.Birthday ? userInfo.Birthday : user.Birthday,
        Password: userInfo.Password ? userInfo.Password : user.Password
      })
      .where("ID = :ID", { ID: id })
      .execute();
  }

  async getUserByUserName(userName: string) {
    return await this.userRepository.find({ UserName: userName });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userRepository.delete({ ID: id });
  }
}
