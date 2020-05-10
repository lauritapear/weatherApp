import { describe, Try } from 'riteway';
import * as path from 'path';
const srcFilename = path.basename(__filename);
const { configureEnvVariables, getEnvConfig } = require('../../config/env');

describe('getConfiguration() - local environment', async assert => {
  const errorMessages = [];
  const logger = {
    info: function (message) {
    },
    error: function (message) {
      errorMessages.push(message);
    }
  };

  const env = {
    DEPLOYMENT_ENVIRONMENT: 'local',
    MONGO_CONNECTION_STRING: 'mongodb://127.0.0.1:27017/',
    TOKEN: 'T0K3N',
    PORT: 3000
  };

  const test = function test() {
    configureEnvVariables(logger, env);
    const configuration = getEnvConfig()
    return {
      configuration,
      errorMessages
    };
  };

  assert({
    given: `(test 1-${srcFilename}) all required environment variables were provided`,
    should: 'get a configuration object',
    actual: test(),
    expected: {
      configuration: {
        deploymentEnvironment : 'local',
        mongoConnectionURL : 'mongodb://127.0.0.1:27017/',
        token : 'T0K3N',
        port: 3000
      },
      errorMessages: ['Retrieved the runtime configuration from the host environment.\nenvironment=\'local\'\nmongoString=\'mongodb://127.0.0.1:27017/\'\ntoken=\'T0K3N\'\nport=\'3000\'']
      }
  });
});

describe('getConfiguration() - missing all env variables', async assert => {
  const errorMessages = [];
  const logger = {
    info: function (message) {
    },
    error: function (message) {
      errorMessages.push(message);
    }
  };

  const test = function test() {
    configureEnvVariables(logger, {});
    const configuration = getEnvConfig()
    return {
      configuration,
      errorMessages
    };
  };

  assert({
    given: `(test 1-${srcFilename})no environment variables were provided`,
    should: 'get an error',
    actual: (await Try(async () => test())).toString(),
    expected: 'Error: A problem was encountered while attempting to retrieve the weathe-service configuration. The following problems were identified:\nThe environment variable \'DEPLOYMENT_ENVIRONMENT\' is required and was not provided.\nThe environment variable \'MONGO_CONNECTION_STRING\' is required and was not provided.\nThe environment variable \'TOKEN\' is required and was not provided.\nThe environment variable \'PORT\' is required and was not provided.'
  });
});
