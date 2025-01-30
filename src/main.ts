import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS for all origins
    app.enableCors({
      origin: '*', // Allow all origins (not recommended for production)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
