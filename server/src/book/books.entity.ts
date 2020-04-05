import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, Unique, ManyToMany, JoinTable} from 'typeorm';
import { Categories } from '../category/categories.entity';
import { Users } from '../user/Users.entity';
import {Authors} from '../author/authors.entity';
@Entity('book',{schema:'storeSchema'})
export class Book {
    @PrimaryGeneratedColumn()
    id :number;
    @Column()
    bookname :string;
    @Column()
    bookpage :number;
    @Column({nullable:false})
    @Unique('uniquebookisbn',['bookisbn'])
    bookisbn :string;
    @Column('decimal')
    bookprice :number;

    @ManyToOne(type=>Categories,category=>category.books)
    categorybook :Categories;
    @ManyToMany(type=>Users,user=>user.books)
    @JoinTable()
    users:Users[];
    @ManyToMany(type=>Authors,author=>author.books) 
    @JoinTable()
    authors:Authors[];




}