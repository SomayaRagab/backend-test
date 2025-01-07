import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode: number = 422;

  constructor(message: string = 'Bad request error') {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    console.log(this.message);
    return [{ message: this.message }];
  }
}
