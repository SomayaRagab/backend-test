import { CustomError } from './custom-error';

export class UnProcessError extends CustomError {
  statusCode = 422;

  constructor(message: string = 'Unprocessable entity error') {
    super(message);
    Object.setPrototypeOf(this, UnProcessError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
