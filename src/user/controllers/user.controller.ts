import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post()
  createUser(@Body() user: IUser): Observable<IUser> {
    return this.userServices.create(user);
  }

  @Get()
  getAllUser(): Observable<IUser[]> {
    return this.userServices.getAllId();
  }

  @Get('/:id')
  getUserById(@Param() param: { id: number }) {
    return this.userServices.getUserById(param.id);
  }

  @Put('/:id')
  updateById(
    @Param() param: { id: number },
    @Body() userInfo: IUser,
  ): Observable<UpdateResult> {
    return this.userServices.updateUserById(param.id, userInfo);
  }
}
