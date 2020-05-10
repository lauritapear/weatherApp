export interface EnvProperties {
  deploymentEnvironment: string;
  mongoConnectionURL: string;
  token: string;
  port: number;
}

const defaultEnvVariables: EnvProperties = {
  deploymentEnvironment: 'local',
  mongoConnectionURL: '',
  token: 'T0K3N',
  port: 3000,
};

function updateSingleVariable(fieldName: string, value: string, logger: any): void {
  if (Object.keys(defaultEnvVariables).indexOf(fieldName) >= 0) {
    (defaultEnvVariables as any)[fieldName] = value;
  } else {
    throw new Error(`failed to set env variable [${fieldName}]=[${value}]`);
  }
}

function populateEnvVariables(map: Map<string, string>, logger: any): void {
  map.forEach((k, v) => {
    updateSingleVariable(v, k, logger);
  });
}

const missingRequiredEnvironmentVariable = (environmentVariableName: any) => {
  return `The environment variable '${environmentVariableName}' is required and was not provided.`;
};

export const configureEnvVariables = (logger: any, env = process.env): void => {
  const deploymentEnvironment = env.DEPLOYMENT_ENVIRONMENT;
  const mongoConnectionURL = env.MONGO_CONNECTION_STRING;
  const token = env.TOKEN;
  const port = env.PORT;

  const errors = [];
  if (!deploymentEnvironment || deploymentEnvironment.length < 1) {
    errors.push(missingRequiredEnvironmentVariable('DEPLOYMENT_ENVIRONMENT'));
  }
  if (!mongoConnectionURL || mongoConnectionURL.length < 1) {
    errors.push(missingRequiredEnvironmentVariable('MONGO_CONNECTION_STRING'));
  }
  if (!token) {
    errors.push(missingRequiredEnvironmentVariable('TOKEN'));
  }

  if (!port) {
    errors.push(missingRequiredEnvironmentVariable('PORT'));
  }

  if (errors.length > 0) {
    throw new Error(
      `A problem was encountered while attempting to retrieve the weathe-service configuration. The following problems were identified:\n${errors.join(
        '\n',
      )}`,
    );
  }

  logger.error(
    `Retrieved the runtime configuration from the host environment.\nenvironment='${deploymentEnvironment}'\nmongoString='${mongoConnectionURL}'\ntoken='${token}'\nport='${port}'`,
  );

  const updateMap = new Map();

  updateMap.set('deploymentEnvironment', deploymentEnvironment);
  updateMap.set('mongoConnectionURL', mongoConnectionURL);
  updateMap.set('token', token);
  updateMap.set('port', port);

  populateEnvVariables(updateMap, logger);
};

export const getEnvConfig = (): EnvProperties => {
  return defaultEnvVariables;
};
