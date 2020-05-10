import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utils';

const initialState2 = {
  loadingHourForecast: false,
  errorHourForecast: false,
  hourForecastData: []
};

function getHourForecastDataStart(state) {
  return updateObject(state, {loadingHourForecast: true});
}

function fetchHourForecastDataFailed(state) {
  return updateObject(state, {
    'loadingHourForecast': false,
    'errorHourForecast':true
  });
}

function setHourForecastData(state, hourForecastData) {
  return updateObject(state, {
    'hourForecastData': hourForecastData,
    'loadingHourForecast': false});
}

function onRestartHourForecastData(state) {
  let theData = state.hourForecastData;
  theData = theData.slice(0,0);
  return updateObject(state, {
    'hourForecastData': theData,
    'loadingHourForecast': false,
    'errorHourForecast':false });
}

export function hourForecastReducer(state = initialState2, action) {
  switch (action.type) {
    case actionTypes.FETCH_HOUR_FORECAST_DATA_FAIL:
      return fetchHourForecastDataFailed(state, action.error)
    case actionTypes.SET_HOUR_FORECAST_DATA:
      return setHourForecastData(state, action.reposData)
    case actionTypes.GET_HOUR_FORECAST_DATA_START:
      return getHourForecastDataStart(state, action)
    case actionTypes.RESTART_HOUR_FORECAST_DATA:
      return onRestartHourForecastData(state)
    default:
      return state
  }
}
