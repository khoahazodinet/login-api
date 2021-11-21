import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Res
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { IUser } from "../models/user.interface";
import {
  CreateUserDto,
  UpdateResponseDto,
  UpdateUserDto,
  UserResponseDto
} from "../models/user.dto";
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
import { Response } from "express";


@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userServices: UserService) {
  }

  // Get all
  @Get()
  @ApiOkResponse({
    type: UserResponseDto
  })
  @ApiNotFoundResponse({
    description: "Not found"
  })
  getAllUser(): Promise<UserResponseDto[]> {
    return this.userServices.getAllId();
  }

  // Get by ID
  @Get("/:id")
  @ApiOkResponse({
    status: 200,
    type: UserResponseDto,
    description: "The user"
  })
  @ApiNotFoundResponse({
    type: UpdateResponseDto,
    description: "Not found"
  })
  getUserById(
    @Param("id") id: number
  ): Promise<UserResponseDto> {
    return this.userServices.getUserById(id);
  }

  // register
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

  // Update
  @Put("/:id")
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
  async updateById(
    @Param("id") id: number,
    @Body() userInfoReq: UpdateUserDto,
    @Res() res: Response
  ) {
    const saltOrRounds = 10;
    const userInfo: IUser = {
      Name: userInfoReq.Name,
      Password: userInfoReq.Password &&
        await bcrypt.hash(userInfoReq.Password, saltOrRounds),
      Birthday: userInfoReq.Birthday
    };

    // check user exists
    const user = this.userServices.getUserById(id);
    if (!user) {
      throw new ForbiddenException();
    }

    // update user
    const result = await this.userServices.updateUserById(id, userInfo);
    if (!result.affected) {
      throw new BadRequestException("Error");
    }
    res.status(200).json({
      statusCode: 200,
      message: "Successful"
    });
  }

  // Delete

}
