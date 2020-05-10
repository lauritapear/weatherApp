import { Router } from 'express';
import { ForecastComponent } from '../components';

const router: Router = Router();

router.get('/cityCode', ForecastComponent.getCityCode);
router.get('/singleDate', ForecastComponent.getSingleDay);

export default router;