export class ApiError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message = "För många förfrågningar. Försök igen om en stund.") {
    super(message, 429);
    this.name = "TooManyRequestsError";
  }
}
