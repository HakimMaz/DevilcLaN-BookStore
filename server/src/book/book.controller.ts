import { Controller, Get, Post, Body, Param, Put, UsePipes, Delete } from '@nestjs/common';
import {BookService} from './book.service'
import { BookDto } from './book.dto';
import { ValidationPipe } from '../shared/validation.pipe';
@Controller()
export class BookController {
    constructor(private bookService:BookService){}
    /**
     * read all existing book
     */
    @Get('api/books')
    readAllBook(){
        return this.bookService.read();
    }
    /**
     * 
     * read all books of one category
     */
    @Get('api/booksWithCategory/:idCategory')
    getBooksWithCategory(@Param('idCategory') idCategory:number){
        console.log("id of category",idCategory)
        return this.bookService.getBooksWithGivenCategory(idCategory);
    }
    /**
     * 
     * @param id 
     * find book with it's id
     */
    @Get('api/book/:id')
    getOneBook(@Param('id') id:number){
        return this.bookService.getBook(id);
    }
    /**
     * 
     * @param data 
     * find book with isbn number
     */
    @Get('api/bookIsbn/:isbn')
    getBookWithIsbn(@Param('isbn')  isbn:string){
       return this.bookService.getBookWIthGivenIsbn(isbn);
    }
    /**
     * 
     * Saving a new book 
     */
     @Post('api/book')
     @UsePipes(new ValidationPipe)
     saveBook(@Body() data:BookDto){
         return this.bookService.create(data);
     }
     /**
      * 
      * @param id 
      * @param data 
      * updating an existing book using 
      */

     @Put('api/book/:id')
     @UsePipes(new ValidationPipe)
     updateBook(@Param('id') id:number,@Body() data:BookDto){
         return this.bookService.editBook(id,data);         
     }
     /**
      * Deleting an existing book
      */
     @Delete('api/book/:id')
     removeBook(@Param('id') id:number ){
          this.bookService.deleteBook(id);
          return {delete:true};
     }

}
