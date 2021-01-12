import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_CONNECTION_URL,
    },
  });

  await app.startAllMicroservicesAsync();

  const PORT = parseInt(process.env.PORT) || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
