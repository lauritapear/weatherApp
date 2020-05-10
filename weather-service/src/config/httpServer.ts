/* eslint-disable @typescript-eslint/no-use-before-define */
import * as http from 'http';
import * as express from 'express';
import { Address } from 'cluster';
// import { LoggerService } from '../lib/LoggerService/LoggerService';

type emptyFunction = () => void;
const closeListeners: emptyFunction[] = [];
// const logger = LoggerService.getInstance().getLogger();

export function init(expressApp: express.Application): http.Server {
  const httpServer: http.Server = http.createServer(expressApp);
  httpServer.on('error', (error: Error) => onError(error, 3000));
  httpServer.on('listening', onListening.bind(httpServer));

  process.on('SIGINT', () => onProcessClosing(httpServer));

  if (process.send) {
    process.send('ready');
  }

  return httpServer;
}

export function registerCloseListener(callback: emptyFunction): void {
  closeListeners.push(callback);
}

export function triggerCloseCallback() {
  let cb: emptyFunction = null;
  while ((cb = closeListeners.pop()) !== undefined) {
    console.log(`=== calling callback now ===`);
    cb();
  }
}

function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use.`);
      process.exit(1);
      break;
    case 'SIGTERM':
    case 'SIGKILL':
      console.log(`${bind} Signal Terminal Received.`);
      process.exit(1);
      break;
    default:
      console.log(`Unknown error code=${error.code}`, error);
      process.exit(1);
      break;
  }
}

function onListening(): void {
  const addr: Address = this.address();
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

function onProcessClosing(httpServer: http.Server): void {
  // const logger = LoggerService.getInstance().getLogger();
  console.log('SIGINT signal received. and then http server');
  // calling all close callbacks
  triggerCloseCallback();
  httpServer.removeAllListeners();
  httpServer.close(function(err: Error) {
    if (err) {
      console.log('Error occured while closing http Server', err);
      process.exit(1);
    } else {
      console.log('Express http server has shut down');
    }
  });
}
