/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { IForecastService } from './interface';
import { ForecastBody } from './model';

export class ForecastService implements IForecastService {
  private static instance: ForecastService;
  public static getInstance(): ForecastService {
    if (!ForecastService.instance) {
      ForecastService.instance = new ForecastService();
    }
    return ForecastService.instance;
  }

  public async cityCode(cityName: string): Promise<any> 
  {
    const cityCodeResponse:any = await this.getCityCode().getCode(cityName);
    // console.log("cityCode response: ", cityCodeResponse.data.key);
    return cityCodeResponse.data[0].Key;
  }

  public async oneDayForecast(cityCode: number): Promise<any> {
    const singleSayResponse : any= await this.getSingleDayForecast().getSingleDay(cityCode);
    console.log(singleSayResponse.data.Headline.Text);
    return singleSayResponse.data.Headline.Text;
  }
  

  getCityCode = () => {
    return {
      getCode: async function getCode(cityName: string) {
        const host = `http://dataservice.accuweather.com/locations/v1/cities/search`;
        return axios
          .get(host, {
            params: {
              apikey: '83uOrfJQO5h07Bz87yR25DcZeMATOpmO',
              q: cityName
            }})
          .then(function(response) {
            
            console.log("cityCode response:",response.data[0].Key)
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
      getSingleDay: async function getSingleDay(cityCode: number) {
        const host = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}`;
        return axios
          .get(host, {
            params: {
              apikey: '83uOrfJQO5h07Bz87yR25DcZeMATOpmO'
            }})
          .then(function(response) {
            console.log("singleDay status:",response)
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
    };
  };
}
