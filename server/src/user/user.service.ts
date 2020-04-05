import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './Users.entity';
import { Repository } from 'typeorm';
import { UserDto, UserRO } from './user.dto';

@Injectable()
export class UserService {
    /**
     * 
     * @param userRepository 
     * Inecting all the depencendies we need to interact entities
     */
    constructor(
        @InjectRepository(Users)
        private userRepository:Repository<Users>
    ){}
    /**
     * service layer : method getUsers
     * get all existing users 
     * result is displayed  according to @toResponseObject(username, password,token)
     */
    async getUsers():Promise<UserRO[]>{
        const users=await this.userRepository.find();
        return users.map(user=>user.toResponseObject(false));

    }
    /**
     * 
     * @param data 
     * service layer:method login
     * login method :search for existence of user with a given username
     * compare it's password with logged password  
     * succes login , method return user with(username, token)
     * fail login , throw exception
     */
    async login(data:UserDto):Promise<UserRO>{
        const {username,password}=data;
        const user =await this.userRepository.findOne({where:{username}});
        console.log(" the user logged : ",user);
        if(!user || !(await user.comparePassword(password))){
            throw new HttpException('Invalid username/password',HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();

    }
    /**
     * 
     * @param data 
     * service layer:register method 
     * method check if user already exist
     * user exist: method throw exception
     * user doesn't exist , method persist user in database
     */
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
