import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from './user.decorator';

@Controller()
export class UserController {
    constructor(private usersService:UserService){}
    

   @Get('api/users')
   @UseGuards(new AuthGuard())
   showAllUsers(){
       
     return this.usersService.getUsers();
   }
   @Post('login')
   @UsePipes(new ValidationPipe)
   login(@Body() data:UserDto){
     return this.usersService.login(data);
   }

   @Post('register')
   @UsePipes(new ValidationPipe)
   Register(@Body() data:UserDto){
     return this.usersService.register(data);

   }
}
