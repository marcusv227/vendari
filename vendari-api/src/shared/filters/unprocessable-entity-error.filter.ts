import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityErrorFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const responseBody = {
      statusCode: status,
      message: 'Unprocessable Entity',
      errors: [],
    };

    if (typeof exception.getResponse === 'function') {
      const exceptionResponse = exception.getResponse() as any;
      if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
        responseBody.errors = exceptionResponse.message.map((error) => ({
          field: error.field,
          message: error.constraints ? Object.values(error.constraints).join(', ') : error.message,
        }));
      }
    }

    response.status(status).json(responseBody);
  }
}
