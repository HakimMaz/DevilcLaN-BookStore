import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './category.dto';
import { CategoryModule } from './category.module';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private catRepository: Repository<Categories>,
  ) {}

  async showAll() {
    return await this.catRepository.find();
  }

  async create(data:Partial<CategoryDto>) {
    //data is an object that contains entity attributs and values
    const cat = this.catRepository.create(data);
    return await this.catRepository.save(cat);
  }

  async read(id: number) {
    const category= await this.catRepository.findOne(id);
    if(!category)
    {
        throw new HttpException('Not found',HttpStatus.NOT_FOUND)
    }
    return category;
  }

  async editCat(id: number, data:Partial<CategoryDto>) {
    const category=await this.catRepository.findOne(id);
    if(!category){
      throw new HttpException('Not found',HttpStatus.NOT_FOUND)
    }
    await this.catRepository.update(id,data);
    return category;
  }

  async destroy(id: number) {
    const category=await this.catRepository.findOne(id);
    if(!category)
    {
      throw new HttpException ('Not found',HttpStatus.NOT_FOUND)
    }
    await this.catRepository.remove(category)
    return { deleted: true };
  }
}
