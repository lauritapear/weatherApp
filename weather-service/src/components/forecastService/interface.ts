import { ForecastBody } from './model';

export interface IForecastService {
  cityCode(cityName: string): Promise<any>;
  oneDayForecast(cityCode: number): Promise<any>;
}
