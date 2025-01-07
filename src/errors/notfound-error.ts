import { CustomError } from './custom-error';

export class NotFound extends CustomError {
  statusCode = 404;

  constructor(message: string = 'Not found error') {
    super(message);
    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
