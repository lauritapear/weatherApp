import * as http from 'http';
import { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  status: number;
  message: string;
  name: 'HttpError';

  constructor(status?: number, message?: string) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
    this.message = message || http.STATUS_CODES[this.status] || 'Error';
  }
}

export const expressErrorResponseHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const [status, name, message] = [500, 'Error', 'Application Error'];
  const errorJson = {
    status,
    name,
    message,
  };

  if (err instanceof HttpError) {
    errorJson.status = err.status;
    errorJson.name = err.name;
    errorJson.message = err.message;
  } else if (err instanceof Error) {
    errorJson.message = err.message || 'Unknown Error Message';
  } else {
    this.logger.error(`Unknown Error Object, not reachable`);
    errorJson.message = `Unknown Error Object, not reachable`;
  }

  // important
  res.status(errorJson.status);

  res.json({
    status: errorJson.status,
    name: errorJson.name,
    message: errorJson.message,
  });
};

const generateHTML = (errorJson: any): string => {
  return (
    "<div style='text-align: center;'>" +
    `<p>Status: ${errorJson.status}</p>` +
    `<p>Name: ${errorJson.name}</p>` +
    `<p>${errorJson}</p>` +
    `</div>`
  );
};
