import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";

import { Auth, GetUser } from "./decorators";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User } from "./interfaces";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("new-account")
  async create(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post("login")
  async login(@Body() loginAuthDto: LoginUserDto) {
    return await this.authService.login(loginAuthDto);
  }

  @Get("renew")
  @Auth()
  async renewToken(@GetUser() user: User) {
    return await this.authService.renewToken(user);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.update(id, updateUserDto);
  }
}
