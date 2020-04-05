import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Categories } from './categories.entity';
import { CategoryController } from './category.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Categories])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
