import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import BusinessError from '../../modules/shared/domain/errors/business.error';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(400).json({
      statusCode: 400,
      type: 'BusinessError',
      error: 'Bad request',
      message: exception.message,
    });
  }
}
