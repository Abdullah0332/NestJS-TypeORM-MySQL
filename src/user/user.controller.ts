import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { updateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getLoggedInUser(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    res.status(200).json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-profile')
  async updateProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: updateUserDto,
  ) {
    const user = await this.userService.updateUser(req.user, body);
    res.status(200).json(user);
  }
}
