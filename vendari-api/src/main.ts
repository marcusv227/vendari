import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Vendari API')
    .setDescription('A simple sales API for managing products, orders, and users.')
    .setVersion('1.0')
    .build();

  const swaggerCustomOptions: SwaggerCustomOptions = {
    customCss: `.swagger-ui .topbar { display: none }`,
    customSiteTitle: 'Vendari API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
  };

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument, swaggerCustomOptions);

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.API_PORT || 3100);
}
bootstrap();
