import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInteceptor } from './shared/Logger.Interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(
  ),AuthorModule,BookModule,UserModule,CategoryModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:HttpErrorFilter
  },
  { 
    provide:APP_INTERCEPTOR,
    useClass:LoggingInteceptor

  }
],
})
export class AppModule {

  
}
