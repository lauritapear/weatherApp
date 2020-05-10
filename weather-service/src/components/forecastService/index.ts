import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../error';
import { ForecastService } from './service';
 

export async function getCityCode(req: Request, res: Response, next: NextFunction): Promise<void> {
  const forecastService = ForecastService.getInstance();
  try {
    console.log("Request Body: ", req.body);
    let code = await forecastService.cityCode(req.body.cityName);
    res.send('city code is: ' + code);
  } catch (error) {
    console.log(`is instanceof HttpError ${error instanceof HttpError}`);
    console.log(`is instanceof Error ${error instanceof Error}`);
    next(error);
  }
}

export async function getSingleDay(req: Request, res: Response, next: NextFunction): Promise<void> {
    const forecastService = ForecastService.getInstance();
  try {
    let cityCode = await forecastService.cityCode(req.body.cityName);
    let singleDayForecast = await forecastService.oneDayForecast(cityCode);
    res.send('singleDayForecast: ' + singleDayForecast);
  } catch (error) {
    console.log(`is instanceof HttpError ${error instanceof HttpError}`);
    console.log(`is instanceof Error ${error instanceof Error}`);
    next(error);
  }
}
