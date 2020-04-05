import { Controller, Get, Body, Post, Param, Delete, UsePipes, Logger, Put } from '@nestjs/common';
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
    /**
     * 
     * @param data 
     * method need authorization to be created
     * category is referentiel table, so its creation wwould be done by the admin
     * to be continued
     */
    @Post()
    @UsePipes(new ValidationPipe())
    saveCategory(@Body() data:Partial<CategoryDto>){
        this.logger.log(JSON.stringify(data));
        return this.categoryService.create(data);
    }
    /**
     * 
     * @param id 
     * get one category 
     */
    @Get(':id')
    getOne(@Param('id') id:number){
        return this.categoryService.read(id);
    }
    /**
     * 
     * @param id 
     * @param data 
     * updating category 
     */
    @Put(':id')
    UpdateCategory(@Param() id:number,@Body() data:Partial<CategoryDto>){
        return this.categoryService.editCat(id,data);
    }/**
     * 
     * @param id 
     * remove and category
     */
    @Delete(':id')
    removeCategory(@Param('id') id:number){
        return this.categoryService.destroy(id);
    }
}
