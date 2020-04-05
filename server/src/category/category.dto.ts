import{IsString} from 'class-validator';

export class CategoryDto{
    @IsString()
    categoryname: string;
}