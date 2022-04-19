import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @MinLength(3, {
    message: 'Username must be atleast 3 characters',
  })
  @MaxLength(50)
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @MinLength(7, {
    message: 'Password must be atleast 7 characters',
  })
  @MaxLength(20, {
    message: 'Password is not more than 20 characters',
  })
  @IsString()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(7, {
    message: 'Password must be atleast 7 characters',
  })
  @MaxLength(20, {
    message: 'Password is not more than 20 characters',
  })
  @IsString()
  password: string;
}
