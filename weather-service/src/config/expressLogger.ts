import { format, transports } from 'winston';
import { Request } from 'express';

import * as fs from 'fs';
import * as path from 'path';
import { LoggerOptions, ErrorLoggerOptions } from 'express-winston';

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const requestFilename: string = path.join(logDir, 'weather-service-http-access.log');
const errorFilename: string = path.join(logDir, 'weather-service-http-error.log');

export function requestLoggerOptions(req: Request): LoggerOptions {
  return {
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
        ),
      }),
      new transports.File({
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
        filename: requestFilename,
        format: format.combine(
          format.label({ label: path.basename(process.mainModule.filename) }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.simple(),
        ),
      }),
    ],
    ignoreRoute: function(req: Request) {
      return req.url === '/health' || req.url === '/favicon.ico';
    },
    meta: false,
    expressFormat: true,
  };
}

export function errorLoggerOptions(req: Request): ErrorLoggerOptions {
  return {
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`),
        ),
      }),
      new transports.File({
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
        filename: errorFilename,
        format: format.combine(
          format.label({ label: path.basename(process.mainModule.filename) }),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.simple(),
        ),
      }),
    ],
    msg: 'HTTP {{req.method}} {{req.url}}',
  };
}
