import * as actionTypes from './actionTypes';

export function getHourForecastDataStart() {
  return {type: actionTypes.GET_HOUR_FORECAST_DATA_START};
}

export function setHourForecastData(reposData) {
  return {type: actionTypes.SET_HOUR_FORECAST_DATA, reposData};
}

export function fetchHourForecastDataFailed(er) {
  return {type: actionTypes.FETCH_HOUR_FORECAST_DATA_FAIL, er};
}

export function getHourForecastData(cityName, dayName) {
  return {
    type: actionTypes.GET_HOUR_FORECAST_DATA,
    cityName: cityName,
    dayName: dayName
  }
}

export function onRestartHourForecastData() {
  return {type: actionTypes.RESTART_HOUR_FORECAST_DATA};
}
