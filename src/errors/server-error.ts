import { CustomError } from './custom-error';

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(message: string = 'Server error') {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
