import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { IUser } from "../models/user.interface";
import { Observable } from "rxjs";
import { CreateUserDto } from "../models/user.dto";

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post()
  createUser(
    @Body() user: IUser
  ): Observable<IUser>{
    return this.userServices.create(user);
  }
}
