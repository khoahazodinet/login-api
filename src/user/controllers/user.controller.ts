// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/login/guards/jwt.auth.guard';

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
  // eslint-disable-next-line prettier/prettier
  updateById(@Param() param: { id: number }, @Body() userInfo: IUser): Observable<UpdateResult> {
    return this.userServices.updateUserById(param.id, userInfo);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() param: { id: number }) {
    return this.userServices.deleteUserById(param.id);
  }
}
