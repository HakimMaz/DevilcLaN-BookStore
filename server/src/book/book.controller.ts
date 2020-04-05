import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {BookService} from './book.service'
import { BookDto } from './book.dto';
@Controller('book')
export class BookController {
    constructor(private bookService:BookService){}
    @Get()
    readAll(){
        return this.bookService.read();
    }

    @Get(':id')
    showOne(@Param('id') id:number){
        console.log("je suis la");
        this.bookService.getBook(id);
    }
     @Post()
     saveCategory(@Body() data:BookDto){
         console.log(" receving data ",data);
         return this.bookService.create(data);
     }
}
