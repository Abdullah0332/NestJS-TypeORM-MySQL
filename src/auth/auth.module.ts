import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from 'src/auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/contants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
