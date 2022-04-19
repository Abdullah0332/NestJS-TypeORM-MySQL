import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  createUser = async (body): Promise<User> => {
    const entity = Object.assign(new User(), body);
    return this.userRepository.save(entity);
  };

  loginUser = async (user) => {
    const payload = { email: user.email, id: user.id, username: user.username };
    delete user.password;
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  };

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email: email.toLocaleLowerCase(),
    });
    // const isPasswordMatch = user.password.toString() === password.toString();
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Inccorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return user;
  }
}
