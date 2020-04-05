import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from './book.dto';
import { Categories } from 'src/category/categories.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Categories)
    private categoryRepository:Repository<Categories>
    
  ) {}
  async read(){
    return await this.bookRepository.find({relations:['categorybook']});
  }
  async getBook(id:number) {
   
    return await this.bookRepository.findOne({
        where:{id},
        relations:['categorybook']
    });
  }
  async create(data: Partial<BookDto>) {
    const book = this.bookRepository.create(data);
    return await this.bookRepository.save(book);
  }
}
