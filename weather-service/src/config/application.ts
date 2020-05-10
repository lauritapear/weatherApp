import {getEnvConfig, EnvProperties } from './env';

class Application {
  
  get env(): EnvProperties {
    return getEnvConfig();
  }
}

const app = new Application();

export default app;
