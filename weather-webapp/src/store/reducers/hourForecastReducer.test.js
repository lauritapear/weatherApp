import {hourForecastReducer} from './hourForecastReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Hour Forecast Reducer', () =>{
  const dataToTest = [
    { Time: "time", Value:40, Icon: "iconPath"},
    { Time: "time", Value:40, Icon: "iconPath"},
    { Time: "time", Value:40, Icon: "iconPath"},
  ];

  it('should have initial state', () =>{
    expect(hourForecastReducer(undefined,{})).toEqual({
      loadingHourForecast: false,
      errorHourForecast: false,
      hourForecastData: []
    });
  })

  it('should store hourForecastData on sucess request', () =>{
    expect(hourForecastReducer({
      loadingHourForecast: false,
      errorHourForecast: false,
      hourForecastData: []
    }, {
      type: actionTypes.SET_HOUR_FORECAST_DATA,
      hourForecastData: dataToTest
    })).toEqual({
      loadingHourForecast: false,
      errorHourForecast: false,
      hourForecastData: dataToTest
    })
  })

  it('should set loading to true when request has been sent', () =>{
    expect(hourForecastReducer({
      loadingHourForecast: false,
      errorHourForecast: false,
      hourForecastData: []
    }, {
      type: actionTypes.GET_HOUR_FORECAST_DATA_START
    })).toEqual({
      loadingHourForecast: true,
      errorHourForecast: false,
      hourForecastData: []
    })
  })

  it('should set error to true and clear loading when request has failed', () =>{
    expect(hourForecastReducer({
      loadingHourForecast: true,
      errorHourForecast: false,
      hourForecastData: []
    }, {
      type: actionTypes.FETCH_HOUR_FORECAST_DATA_FAIL
    })).toEqual({
      loadingHourForecast: false,
      errorHourForecast: true,
      hourForecastData: []
    })
  })

  it('should clear all data when restart had been requested', () =>{
    expect(hourForecastReducer({
      loadingHourForecast: false,
      errorHourForecast: true,
      hourForecastData: dataToTest
    }, {
      type: actionTypes.RESTART_HOUR_FORECAST_DATA
    })).toEqual({
      loadingHourForecast: false,
      errorHourForecast: false,
      hourForecastData: []
    })
  })
  });
