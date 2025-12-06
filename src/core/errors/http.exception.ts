export class HttpException extends Error {
  public statusCode: number;
  public error: string;

  constructor(message: string, statusCode = 400, error = "Bad Request") {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(message, 400, "Bad Request");
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, 401, "Unauthorized");
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, 403, "Forbidden");
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(message, 404, "Not Found");
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(message, 409, "Conflict");
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message = "Unprocessable Entity") {
    super(message, 422, "Unprocessable Entity");
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(message, 500, "Internal Server Error");
  }
}
