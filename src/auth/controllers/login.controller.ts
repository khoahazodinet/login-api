import { BadRequestException, Body, Controller, Post, Res } from "@nestjs/common";
import { LoginRequestDto } from "../models/login.dto";
import { LoginService } from "../services/login.service";
import { IUser } from "../../user/models/user.interface";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";


@Controller("auth")
export class LoginController {
  constructor(
    private loginService: LoginService,
  ) {
  }

  @Post()
  async login(
    @Body() loginReq: LoginRequestDto
    // @Res() res: Response
  ) {


    return loginReq;

    // mapper
    // const userReq: IUser = {
    //   UserName: loginReq.userName,
    //   Password: loginReq.password
    // };
    //
    // // find user
    // const user = await this.loginService.findOne(
    //   { UserName: userReq.UserName });
    //
    // if (!user) {
    //   throw new BadRequestException("Invalid user");
    // }
    //
    // // check password
    // if (!await bcrypt.compare(userReq.Password, user.Password)) {
    //   throw new BadRequestException("Invalid password");
    // }

    // const jwt = await this.jwtService.signAsync({
    //   ID: user.ID
    // });

    // res.cookie("jwt", jwt, { httpOnly: true });
    // res.status(200).json({
    //   statusCode: 200,
    //   accessToken: 'abcd'
    // });
  }
}
