import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap().then(()=>{
  console.log('the server had started', process.env.PASSWORD)
});