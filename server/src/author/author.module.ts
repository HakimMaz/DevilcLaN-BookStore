import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from './authors.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Authors])],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
