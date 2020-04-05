import { Controller, Get, Body, Post, Param, Delete, UsePipes, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}
     private logger= new Logger('CategoryController');

    @Get()
    showAll(){
        return this.categoryService.showAll();
    }
    @Post()
    @UsePipes(new ValidationPipe())
    saveCategory(@Body() data:Partial<CategoryDto>){
        this.logger.log(JSON.stringify(data));
        console.log(" receving data ",data);
        return this.categoryService.create(data);
    }
    @Get(':id')
    getOne(@Param('id') id:number){
        return this.categoryService.read(id);
    }
    @Delete(':id')
    removeCategory(@Param('id') id:number){
        return this.categoryService.destroy(id);
    }
}
