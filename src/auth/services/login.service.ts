import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { Repository } from "typeorm";
import { IUser } from "../../user/models/user.interface";


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async findOne(condition: { [key: string]: any }): Promise<IUser> {
    return this.userRepository.findOne(condition);
  }
}
