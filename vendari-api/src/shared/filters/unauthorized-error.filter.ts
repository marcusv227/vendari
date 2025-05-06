import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import UnauthorizedError from '../../modules/shared/domain/errors/unauthorized.error';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(401).json({
      statusCode: 401,
      error: 'Unauthorized',
      message: exception.message,
    });
  }
}
