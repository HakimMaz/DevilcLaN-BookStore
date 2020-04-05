import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './Users.entity';
import { UserController } from './user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers:[UserController],
  providers: [UserService]
})
export class UserModule {}
