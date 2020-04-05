import {Entity,PrimaryGeneratedColumn,Column, ManyToMany} from 'typeorm';
import { Book } from '../book/books.entity';
@Entity('authors',{schema: 'storeSchema'})
export class Authors{
    @PrimaryGeneratedColumn()
    id: number; 
    @Column()
    authorname: String;
    @ManyToMany(type=>Book,book=>book.authors)
    books:Book[];
}