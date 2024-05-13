import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return this.usersService.getUserInfo(req.user);
  }

  @Get()
  list() {
    return this.usersService.list();
  }
}
