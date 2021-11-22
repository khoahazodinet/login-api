import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
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
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../models/user.dto";
import { IUser } from "../models/user.interface";
import { UserService } from "../services/user.service";


@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userServices: UserService) {
  }

  // Get all
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: UserResponseDto,
    description: "List user"
  })
  @ApiNotFoundResponse({
    description: "Not found"
  })
  getAllUser(): Promise<UserResponseDto[]> {
    return this.userServices.getAllId();
  }

  // Get by ID
  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: UserResponseDto,
    description: "The user"
  })
  @ApiNotFoundResponse({
    description: "Not found"
  })
  getUserById(@Param("id") id: number): Promise<UserResponseDto> {
    return this.userServices.getUserById(id);
  }

  // register
  @Post("/register")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: UserResponseDto
  })
  @ApiForbiddenResponse({
    description: "Forbidden."
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() userReq: CreateUserDto): Promise<UserResponseDto> {
    const saltOrRounds = 10;
    const user: IUser = {
      Email: userReq.email,
      Name: userReq.name,
      UserName: userReq.userName,
      Password: await bcrypt.hash(userReq.password, saltOrRounds),
      Birthday: userReq.birthday
    };
    return this.userServices.create(user);
  }

  // Update
  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    // type: UpdateResponseDto,
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
      Name: userInfoReq.name,
      Password:
        userInfoReq.password &&
        (await bcrypt.hash(userInfoReq.password, saltOrRounds)),
      Birthday: userInfoReq.birthday
    };
    console.log(userInfo);

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
  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  delete(@Param() param: { id: number }) {
    return this.userServices.deleteUserById(param.id);
  }
}
