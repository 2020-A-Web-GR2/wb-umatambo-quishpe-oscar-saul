import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * Cualquier configuracion se tiene que hacer
  * antes del app.listen
   */


  await app.listen(3001);
}
bootstrap();
