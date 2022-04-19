import { Controller, Post, Res, Req, Body, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards';
import { LoginDto, UserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: UserDto, @Res() res: Response) {
    try {
      await this.authService.createUser(body);
      res.status(201).json({ message: 'User Created Successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Body() body: LoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const user = await this.authService.loginUser(req.user);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
