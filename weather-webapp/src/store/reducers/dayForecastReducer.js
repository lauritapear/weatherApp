import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utils';

const initialState = {
  loading: false,
  error: false,
  dayForecastData: []
};

function getDayForecastDataStart(state) {
  return updateObject(state, {loading: true});
}

function fetchDayForecastDataFailed(state) {
  return updateObject(state, {
    'loading': false,
    'error':true
  });
}

function compareForks(a, b) {
  return b.forks_count - a.forks_count;
}

function setDayForecastData(state, dayForecastData) {
  let sortedData = dayForecastData.DailyForecasts;
  console.log("sortedData", sortedData);
  // sortedData.sort(compareForks);
  return updateObject(state, {
    'dayForecastData': sortedData,
    'loading': false});
}

function onRestartDayForecastData(state) {
  let dayForecastData = state.dayForecastData;
  dayForecastData = dayForecastData.slice(0,0);
  return updateObject(state, {
    'dayForecastData': dayForecastData,
    'loading': false,
    'error':false });
}

export function dayForecastReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DAY_FORECAST_DATA_FAIL:
      return fetchDayForecastDataFailed(state, action.error)
    case actionTypes.SET_DAY_FORECAST_DATA:
      return setDayForecastData(state, action.dayForecastData)
    case actionTypes.GET_DAY_FORECAST_DATA_START:
      return getDayForecastDataStart(state, action)
    case actionTypes.RESTART_DAY_FORECAST_DATA:
      return onRestartDayForecastData(state)
    default:
      return state
  }
}
