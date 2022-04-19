import { IsString } from 'class-validator';

export class updateUserDto {
  @IsString()
  username: string;
}
