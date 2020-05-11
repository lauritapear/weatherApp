import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../error';
import { ForecastService } from './service';

export async function getCityCode(req: Request, res: Response, next: NextFunction): Promise<void> {
  const forecastService = ForecastService.getInstance();
  try {
    console.log('Request query: ', req.query.cityName);
    let code = await forecastService.cityCode(req.query.cityName.toString());
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
    let cityCode = await forecastService.cityCode(req.query.cityName.toString());
    let singleDayForecast = await forecastService.oneDayForecast(cityCode);
    res.send('singleDayForecast: ' + singleDayForecast);
  } catch (error) {
    console.log(`is instanceof HttpError ${error instanceof HttpError}`);
    console.log(`is instanceof Error ${error instanceof Error}`);
    next(error);
  }
}

export async function getFiveDays(req: Request, res: Response, next: NextFunction): Promise<void> {
  const forecastService = ForecastService.getInstance();
  try {
    let cityCode = await forecastService.cityCode(req.query.cityName.toString());
    let fiveDaysForecast = await forecastService.fiveDaysForecast(cityCode);
    res.send(fiveDaysForecast);
  } catch (error) {
    console.log(`is instanceof HttpError ${error instanceof HttpError}`);
    console.log(`is instanceof Error ${error instanceof Error}`);
    next(error);
  }
}

export async function getTwelveHours(req: Request, res: Response, next: NextFunction): Promise<void> {
  const forecastService = ForecastService.getInstance();
  try {
    let cityCode = await forecastService.cityCode(req.query.cityName.toString());
    let twelveHoursForecast = await forecastService.twelveHoursForecast(cityCode);
    res.send(twelveHoursForecast);
  } catch (error) {
    console.log(`is instanceof HttpError ${error instanceof HttpError}`);
    console.log(`is instanceof Error ${error instanceof Error}`);
    next(error);
  }
}
