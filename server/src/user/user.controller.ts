import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { User } from './user.decorator';

@Controller()
export class UserController {
    constructor(private usersService:UserService){}
    /**
     * Read all users , one the user is connected 
     * this method need authorization , the use of @UseGuardds()
     * user should have a valid token to acces to this service 
     * token is introduced in 
     */

   @Get('api/users')
   @UseGuards(new AuthGuard())
   showAllUsers(){
       
     return this.usersService.getUsers();
   }
   /**
    * 
    * @param data 
    * the login service , to athenticate user 
    * method needs validation , in case of worng username/password or no existing user
    */
   @Post('login')
   @UsePipes(new ValidationPipe)
   login(@Body() data:UserDto){
     return this.usersService.login(data);
   }
   /**
    * 
    * @param data 
    * signUp service to register new user 
    * methods needs validation for both username and password (not empty,and respect type)
    */
   @Post('singUp')
   @UsePipes(new ValidationPipe)
   signUp(@Body() data:UserDto){
     return this.usersService.register(data);

   }
}
