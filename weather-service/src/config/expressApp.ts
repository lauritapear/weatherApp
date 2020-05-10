import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as expressWinston from 'express-winston';
import * as routes from '../routes';
import { expressErrorResponseHandler } from '../error';
import { requestLoggerOptions, errorLoggerOptions } from './expressLogger';
// import { cookieAuth } from '@sa-server/core';
import app from './application';

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};
const nodeEnv = app.env.deploymentEnvironment || 'local';
const secret = '42';

const load = (): express.Application => {
  const expressApp: express.Application = express();
  expressApp.use(bodyParser.json({ limit: '2mb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
  expressApp.use(cookieParser());
  // expressApp.use(cookieAuth({ excludePaths: ['/health', '/api-docs'], environment: nodeEnv, secret: secret }));
  expressApp.use(compression());
  expressApp.use(helmet());

  const router: express.Router = express.Router();
  router.use(cors(options));
  routes.init(router);
  expressApp.use(expressWinston.logger(requestLoggerOptions(express.request)));
  expressApp.use(router);
  expressApp.use(expressWinston.errorLogger(errorLoggerOptions(express.request)));
  expressApp.use(methodOverride());
  router.options('*', cors(options));
  expressApp.use(expressErrorResponseHandler);
  return expressApp;
};

const expressApp = load();
export default expressApp;
