import ServiceUnavailableError from '../../modules/shared/domain/errors/service-unavailable.error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(ServiceUnavailableError)
export class ServiceUnavailableErrorFilter implements ExceptionFilter {
  catch(exception: ServiceUnavailableError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(503).json({
      statusCode: 503,
      error: 'Service Unavailable',
      message: exception.message,
    });
  }
}
