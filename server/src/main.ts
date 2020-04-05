import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

import { Logger } from '@nestjs/common';
// somewhere in your initialization file
const port =process.env.PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  await app.listen(port);
  Logger.log(`the server is running on : http//localhost:${port}`);
  console.log(' the port that application is working on is : ',port);
}
bootstrap();
