import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IUser } from '../models/user.interface';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from '../models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(newUser: IUser): Observable<IUser> {
    return from(this.userRepository.save(newUser));
  }

  getAllId(): Observable<IUser[]> {
    return from(this.userRepository.find());
  }

  getUserById(id: number): Observable<IUser> {
    return from(this.userRepository.findOne(id));
  }

  updateUserById(id: number, userInfo: IUser): Observable<UpdateResult> {
    return from(this.userRepository.update(id, userInfo));
  }
  async getUserByUserName(userName: string) {
    const result = await this.userRepository.find({ UserName: userName });
    return result;
  }
}
