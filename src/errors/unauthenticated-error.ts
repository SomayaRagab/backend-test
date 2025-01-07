import { CustomError } from './custom-error';

export class UnauthenticatedError extends CustomError {
  statusCode = 401;

  constructor(message: string = 'Unauthenticated error') {
    super(message);
    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
