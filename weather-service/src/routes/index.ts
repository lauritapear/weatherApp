import * as http from 'http';
import * as express from 'express';
import forecast from './forecast';
export function init(router: express.Router): void {
  router.use('/api/forecast', forecast);

  router.use((req, res, next) => {
    res.status(405).send(http.STATUS_CODES[405]);
  });
}
