import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert} from 'typeorm';
import{Book} from '../book/books.entity';
import * as bcrypt from 'bcryptjs';
import { sign } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
@Entity('user',{schema: 'storeSchema'})
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({
        type:'text',
        unique:true
    })
    username: string;
    @Column('text')
    password: string;
    @Column({nullable:true})
    firstname: string;
    @Column({nullable:true})
    lastname: string;
    @Column({nullable:true})
    adresse: string;
    @Column({nullable:true})
    telephone: string;
    @Column({nullable:true})
    email: string;
    @ManyToMany(type=>Book,book=>book.users)
    books:Book[];

    @BeforeInsert()
    async hashpassword(){
        this.password= await bcrypt.hash(this.password,10);
        
    }
    toResponseObject(showToken:boolean=true):UserRO{
        const {id,username,token}=this;
        const responseObject:any={id,username};
        if(showToken){
            responseObject.token=token;
        }
        return responseObject;
    }
    async comparePassword(attempt:string){
      return bcrypt.compare(attempt,this.password);
    }
    private get token(){
        const{id,username}=this;
        return jwt.sign({
            id,
            username
        },process.env.SECRET,
        {
            expiresIn:'1d'}
            )
         }



}