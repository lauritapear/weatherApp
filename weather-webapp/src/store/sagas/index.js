import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {getDayForecastDataSaga} from './dayForecastSaga';
import {getHourForecastDataSaga} from './hourForecastSaga';
import {handleRestartSaga} from './restartSaga';


export function * watchDayForecast() {
  yield takeEvery(actionTypes.GET_DAY_FORECAST_DATA, getDayForecastDataSaga);
}

export function * watchRepoCommits() {
  yield takeEvery(actionTypes.GET_HOUR_FORECAST_DATA, getHourForecastDataSaga);
}

export function * watchRestart() {
  yield takeEvery(actionTypes.RESTART_CLICK, handleRestartSaga);
}
