import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import UniqueError from 'src/modules/shared/domain/errors/unique.error';

@Catch(UniqueError)
export class UniqueErrorFilter implements ExceptionFilter {
  catch(exception: UniqueError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(409).json({
      statusCode: 409,
      error: 'Conflict',
      message: exception.message,
    });
  }
}
