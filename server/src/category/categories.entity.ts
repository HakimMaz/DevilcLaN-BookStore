import {Entity,PrimaryGeneratedColumn,Column, OneToMany} from 'typeorm';
import{Book} from '../book/books.entity';
@Entity('categories', {schema: 'storeSchema'})
export class Categories {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false,unique:true})
    categoryname: string;

    @OneToMany(type=>Book,book=>book.categorybook)
    books: Book[];

  
}