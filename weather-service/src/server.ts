import * as http from 'http';
import * as express from 'express';
import { app, httpServer, expressApp } from './config';

async function main() {

  // init express app
  const expApp: express.Application = expressApp;
  // start http server using ExpressApp instance
  const nodeHttpServer: http.Server = httpServer.init(expApp);

  // start listening
  nodeHttpServer.listen(app.env.port, '0.0.0.0');
}

// javasript IIFE
(async () => {
  // const logger = LoggerService.getInstance().getLogger();
  try {
    await main();
  } catch (err) {
    console.log('Application Start Error', err);
  }
})();
