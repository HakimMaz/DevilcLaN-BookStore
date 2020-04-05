import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
    constructor(private authorService:AuthorService){}
    @Get()
    showAll(){
        this.authorService.getAuthors();
    }
}
