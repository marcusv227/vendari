import {
    ClassSerializerInterceptor,
    INestApplication,
    UnprocessableEntityException,
    ValidationPipe,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { BusinessErrorFilter } from './shared/filters/business-error.filter';
  import { NotFoundErrorFilter } from './shared/filters/not-found-error.filter';
  import { UniqueErrorFilter } from './shared/filters/unique-error.filter';
  import { ServiceUnavailableErrorFilter } from './shared/filters/service-unavailable-error.filter';
  import { UnauthorizedErrorFilter } from './shared/filters/unauthorized-error.filter';
  
  export function applyGlobalConfig(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
          const errors = validationErrors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          }));
          return new UnprocessableEntityException(errors);
        },
      }),
      new ValidationPipe({
        errorHttpStatusCode: 406,
      }),
    );
  
    app.useGlobalFilters(
      new BusinessErrorFilter(),
      new UniqueErrorFilter(),
      new NotFoundErrorFilter(),
      new ServiceUnavailableErrorFilter(),
      new UnauthorizedErrorFilter(),
    );
  }
  