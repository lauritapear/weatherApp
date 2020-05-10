import { describe, Try } from 'riteway';
import * as http from 'http';
import * as httpServer from '../../config/httpServer';
import * as express from 'express';

import * as path from 'path';
const srcFilename = path.basename(__filename);

const expressApp = express();
const nodeHttpServer: http.Server = httpServer.init(expressApp);

describe('httpServer() instance', async assert => {
  /* Test 1 */ {
    let callBackCounter = 0;
    function cb1() {
      callBackCounter++;
    }

    function cb2() {
      callBackCounter++;
    }
    httpServer.registerCloseListener(cb1);
    httpServer.registerCloseListener(cb2);

    httpServer.triggerCloseCallback();

    assert({
      given: `(test 1-${srcFilename}) registerClassback() of 2 count`,
      should: `call callback two functions, when triggered`,
      actual: callBackCounter,
      expected: 2,
    });
  }
}); /* end of describe*/
