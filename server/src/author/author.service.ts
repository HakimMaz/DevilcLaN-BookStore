import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authors } from './authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Authors)
        private authorRepository:Repository<Authors>
    ){}
    async getAuthors()
    {
        return this.authorRepository.find();
    }
}
