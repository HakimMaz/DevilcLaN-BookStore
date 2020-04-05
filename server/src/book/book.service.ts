import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  /**
   * read all books
   */
  async read(){
    return await this.bookRepository.find({relations:['categorybook']});
  }
  /**
   * 
   * @param id 
   * find a book using id
   */
  async getBook(id:number) { 
    return await this.bookRepository.findOne(id,{relations:['categorybook']});
  }
  /**
   * 
   * @param idCategory 
   * find all books with given category
   */
  async getBooksWithGivenCategory(idCategory:number){
     return await this.bookRepository
     .createQueryBuilder("book")
     .leftJoinAndSelect("book.categorybook", "categories")
     .where("categories.id = :idCategory",{idCategory:idCategory})   
     .getMany();
  }
  /**
   * 
   * @param isbn 
   * layer:service book
   * finding a book with given isbn
   * isbn is unique key
   * method must return only one or no result
   */
  async getBookWIthGivenIsbn(isbn:string){
    return await this.bookRepository.findOne({ bookisbn: isbn },{relations:['categorybook']});
  }
  /**
   * 
   * @param id 
   * @param data 
   * layer:service book
   * edit an existing book with id
   */
  async editBook(id:number,data:BookDto){
     return await this.bookRepository.update(id,data);
  }
/**
 * 
 * @param data 
 * layer:servicebook
 * persist a book (new book)
 */
  async create(data: Partial<BookDto>) {
    const bookcheck=this.bookRepository.findOne({bookisbn:data.bookisbn})
    if(bookcheck){
      throw new HttpException('Isbn alredy existe',HttpStatus.FORBIDDEN);
    }
    const book = this.bookRepository.create(data);
    return await this.bookRepository.save(book);
  }
  /**
   * 
   * @param id 
   * layer:servicebook
   * deleting book
   */
  async deleteBook(id:number){
    const book= await this.bookRepository.findOne(id);
    if(!book){
      throw new HttpException('Book not found',HttpStatus.NOT_FOUND);
    }
    return await this.bookRepository.remove(book);
  }
}
