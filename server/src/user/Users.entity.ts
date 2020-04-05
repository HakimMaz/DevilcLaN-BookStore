import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert} from 'typeorm';
import{Book} from '../book/books.entity';
import * as bcrypt from 'bcryptjs';
import { sign } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
@Entity('user',{schema: 'storeSchema'})
export class Users {
    
    /**
     * uuid to generate unique id with sequence strategy generation
     *  
     */
    @PrimaryGeneratedColumn('uuid')
    id: number;
    /**
     * username needs to be unique , to distingue users
     */
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
    /**
     * @BeforeInsert
     * method intecepts data on signup action, and crypt the password 
     * before save it in database

     */
    @BeforeInsert()
    async hashpassword(){
        this.password= await bcrypt.hash(this.password,10);
        
    }
    /**
     * 
     * after login the result will be dispalyed according to toResponseObject
     */
    toResponseObject(showToken:boolean=true):UserRO{
        const {id,username,token}=this;
        const responseObject:any={id,username};
        if(showToken){
            responseObject.token=token;
        }
        return responseObject;
    }
    /**
     * 
     * compare given password with existing on
     */
    async comparePassword(attempt:string){
      return bcrypt.compare(attempt,this.password);
    }
    /**
     * method generates token for username
     */
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