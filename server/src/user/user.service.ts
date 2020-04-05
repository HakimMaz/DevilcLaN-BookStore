import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './Users.entity';
import { Repository } from 'typeorm';
import { UserDto, UserRO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository:Repository<Users>
    ){}
    async getUsers():Promise<UserRO[]>{
        const users=await this.userRepository.find();
        return users.map(user=>user.toResponseObject(false));

    }
    async login(data:UserDto):Promise<UserRO>{
        const {username,password}=data;
        const user =await this.userRepository.findOne({where:{username}});
        console.log(" the user logged : ",user);
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('Invalid username/password',HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();

    }
    async register(data:UserDto):Promise<UserRO>{
        const {username}=data;
        let user= await this.userRepository.findOne({where:{username}});
        if(user){
            throw new HttpException('username already existe',HttpStatus.BAD_REQUEST);
        }
        user= await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();

    }

}
