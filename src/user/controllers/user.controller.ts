import { Body, Controller, Get, Param, Post, Put, Response } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { IUser } from "../models/user.interface";
import { CreateUserDto, UpdateResponseDto, UpdateUserDto, UserResponseDto } from "../models/user.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { Type } from "class-transformer";


@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userServices: UserService) {
  }

  @ApiOkResponse({
    type: UserResponseDto,
    description: "The list of user"
  })
  @ApiNotFoundResponse({
    description: "Not found"
  })
  @Get()
  getAllUser(): Promise<UserResponseDto[]> {
    return this.userServices.getAllId();
  }

  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user"
  })
  @ApiNotFoundResponse({
    description: "Not found"
  })
  @Get("/:id")
  getUserById(
    @Param("id") id: number
  ): Promise<UserResponseDto> {
    return this.userServices.getUserById(id);
  }

  @Post("/register")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: UserResponseDto
  })
  @ApiForbiddenResponse({
    description: "Forbidden."
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @Body() userReq: CreateUserDto
  ): Promise<UserResponseDto> {
    const saltOrRounds = 10;
    const user: IUser = {
      Email: userReq.Email,
      Name: userReq.Name,
      UserName: userReq.UserName,
      Password: await bcrypt.hash(userReq.Password, saltOrRounds),
      Birthday: userReq.Birthday
    };
    return this.userServices.create(user);
  }

  @ApiOkResponse({
    type: UpdateResponseDto
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized"
  })
  @ApiBadRequestResponse({
    description: "Bad request"
  })
  @ApiForbiddenResponse({
    description: "Forbidden."
  })
  @ApiBody({ type: UpdateUserDto })
  @Put("/:id")
  async updateById(
    @Param("id") id: number,
    @Body() userInfoReq: UpdateUserDto,
    @Response() res: any
  ) {
    const saltOrRounds = 10;
    const userInfo: IUser = {
      Name: userInfoReq.Name,
      Password: userInfoReq.Password ??
        await bcrypt.hash(userInfoReq.Password, saltOrRounds),
      Birthday: userInfoReq.Birthday
    };
    const result = await this.userServices.updateUserById(id, userInfo)
    if(result.affected) res.status(200).json({
      statusCode: 200,
      message: 'updated'
    });
  }
}
