export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: string;

  constructor(httpStatusCode: number, errorType: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype); // should be done whenever a built-in class is extended https://bobbyhadz.com/blog/typescript-extend-error-class

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON() {
    return {
      errorType: this.errorType,
      errorMessage: this.message
    };
  }
}