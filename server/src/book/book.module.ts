import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { Categories } from '../category/categories.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Book,Categories])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
