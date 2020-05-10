import { Router } from 'express';
import { ForecastComponent } from '../components';

const router: Router = Router();

router.get('/cityCode', ForecastComponent.getCityCode);
router.get('/singleDay', ForecastComponent.getSingleDay);
router.get('/fiveDays', ForecastComponent.getFiveDays);
router.get('/twelveHours', ForecastComponent.getTwelveHours);

export default router;
