import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  updateUser = async (user, body): Promise<User> => {
    await this.usersRepository.update({ id: user.id }, { ...body });
    const updateUser = await this.usersRepository.findOne({ id: user.id });
    delete updateUser.password;
    return updateUser;
  };
}
