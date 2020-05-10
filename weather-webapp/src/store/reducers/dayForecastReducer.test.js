import {dayForecastReducer} from './dayForecastReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Day Forecast Reducer', () =>{
  const dataToTest = [
    {Date: "2020-05-10T07:00:00+02:00", Temperature: {Minimun:{Value:40}} },
    {Date: "2020-05-10T07:00:00+02:00",  Temperature: {Minimun:{Value:40}} },
    {Date: "2020-05-10T07:00:00+02:00",  Temperature: {Minimun:{Value:40}} },
    {Date: "2020-05-10T07:00:00+02:00",  Temperature: {Minimun:{Value:40}} },
  ];

  it('should have initial state', () =>{
    expect(dayForecastReducer(undefined,{})).toEqual({
      loading: false,
      error: false,
      dayForecastData: []
    });
  })

  it('should store Repo data on sucess request', () =>{
    expect(dayForecastReducer({
      loading: false,
      error: false,
      dayForecastData: []
    }, {
      type: actionTypes.SET_DAY_FORECAST_DATA,
      reposData: dataToTest
    })).toEqual({
      loading: false,
      error: false,
      dayForecastData: dataToTest
    })
  })

  it('should set loading to true when request has been sent', () =>{
    expect(dayForecastReducer({
      loading: false,
      error: false,
      dayForecastData: []
    }, {
      type: actionTypes.GET_DAY_FORECAST_DATA_START
    })).toEqual({
      loading: true,
      error: false,
      dayForecastData: []
    })
  })

  it('should set error to true and clear loading when request has failed', () =>{
    expect(dayForecastReducer({
      loading: true,
      error: false,
      dayForecastData: []
    }, {
      type: actionTypes.FETCH_DAY_FORECAST_DATA_FAIL
    })).toEqual({
      loading: false,
      error: true,
      dayForecastData: []
    })
  })

  it('should clear all data when restart had been requested', () =>{
    expect(dayForecastReducer({
      loading: true,
      error: true,
      dayForecastData: dataToTest
    }, {
      type: actionTypes.RESTART_ORGANIZATION_DATA
    })).toEqual({
      loading: false,
      error: false,
      dayForecastData: []
    })
  })
});
