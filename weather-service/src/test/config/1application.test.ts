import { describe, Try } from 'riteway';
import {app} from '../../config';

import * as path from 'path';
const srcFilename = path.basename(__filename);

describe('get logger() instance', async assert => {
  /* Test 1 */
  {
    const expectedEnvValues = {
      deploymentEnvironment: 'local',
      mongoConnectionURL: '',
      token: 'T0K3N',
      port: 3000,
    };
    
    assert({
      given: `(test 1-${srcFilename}) env from "app.env" `,
      should: ' return default env properties',
      actual: app.env,
      expected: expectedEnvValues,
    });
  }

}); /* end of describe*/
