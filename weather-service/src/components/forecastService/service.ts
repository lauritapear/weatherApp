/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { IForecastService } from './interface';
import { ForecastBody } from './model';
import { app } from '../../config';

export class ForecastService implements IForecastService {
  private static instance: ForecastService;
  public static getInstance(): ForecastService {
    if (!ForecastService.instance) {
      ForecastService.instance = new ForecastService();
    }
    return ForecastService.instance;
  }

  public async cityCode(cityName: string): Promise<any> {
    const cityCodeResponse: any = await this.getCityCode().getCode(cityName, app.env.token);
    return cityCodeResponse.data[0].Key;
  }

  public async oneDayForecast(cityCode: number): Promise<any> {
    const singleDayResponse: any = await this.getSingleDayForecast().getSingleDay(cityCode, app.env.token);
    console.log(singleDayResponse.data.Headline.Text);
    return singleDayResponse.data.Headline.Text;
  }

  public async fiveDaysForecast(cityCode: number): Promise<any> {
    const fiveDaysResponse: any = await this.getFiveDaysForecast().getFiveDays(cityCode, app.env.token);
    console.log(fiveDaysResponse.data.Headline.DailyForecasts);
    return fiveDaysResponse.data.Headline.DailyForecasts;
  }

  public async twelveHoursForecast(cityCode: number): Promise<any> {
    const twelveDaysResponse: any = await this.getTwelveHoursForecast().getTwelveHours(cityCode, app.env.token);
    console.log(twelveDaysResponse.data);
    return twelveDaysResponse.data;
  }

  getCityCode = () => {
    return {
      getCode: async function getCode(cityName: string, token: string) {
        const host = `http://dataservice.accuweather.com/locations/v1/cities/search`;
        return axios
          .get(host, {
            params: {
              apikey: token,
              q: cityName,
            },
          })
          .then(function(response) {
            console.log('cityCode response:', response.data[0].Key);
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    };
  };

  getSingleDayForecast = () => {
    return {
      getSingleDay: async function getSingleDay(cityCode: number, token: string) {
        const host = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}`;
        return axios
          .get(host, {
            params: {
              apikey: token,
            },
          })
          .then(function(response) {
            console.log('singleDay status:', response.status);
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    };
  };

  getFiveDaysForecast = () => {
    return {
      getFiveDays: async function getFiveDays(cityCode: number, token: string) {
        const host = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}`;
        return axios
          .get(host, {
            params: {
              apikey: token,
            },
          })
          .then(function(response) {
            console.log('FiveDays status:', response.status);
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    };
  };

  getTwelveHoursForecast = () => {
    return {
      getTwelveHours: async function getTwelveHours(cityCode: number, token: string) {
        const host = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}`;
        return axios
          .get(host, {
            params: {
              apikey: token,
            },
          })
          .then(function(response) {
            console.log('TwelveHours status:', response.status);
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    };
  };
}
