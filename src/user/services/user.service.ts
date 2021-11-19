import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../models/user.entity";
import { Repository } from "typeorm";
import { IUser } from "../models/user.interface";
import { from, Observable } from "rxjs";
import { CreateUserDto } from "../models/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  create(newUser: IUser): Observable<IUser>{
    return from(this.userRepository.save(newUser));
  }

}
