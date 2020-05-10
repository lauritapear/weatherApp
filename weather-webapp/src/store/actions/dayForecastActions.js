import * as actionTypes from './actionTypes';

export function getDayForecastDataStart() {
  return {type: actionTypes.GET_DAY_FORECAST_DATA_START};
}

export function setDayForecastData(dayForecastData) {
  return {type: actionTypes.SET_DAY_FORECAST_DATA, dayForecastData};
}

export function fetchDayForecastDataFailed(er) {
  return {type: actionTypes.FETCH_DAY_FORECAST_DATA_FAIL, er};
}

export function getDayForecastData(cityName) {
  return {
    type: actionTypes.GET_DAY_FORECAST_DATA,
    cityName: cityName
  }
}

export function onRestartDayForecastData() {
  return {type: actionTypes.RESTART_DAY_FORECAST_DATA};
}
