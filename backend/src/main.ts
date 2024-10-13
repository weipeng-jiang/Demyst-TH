import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8000',
  });

  app.setGlobalPrefix('api');

  console.log('process.env.XERO_API_URL: ', process.env.XERO_API_URL);

  const config = new DocumentBuilder()
    .setTitle('Demyst Takehome')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(8080);
}
bootstrap();
