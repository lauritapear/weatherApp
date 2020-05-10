import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function * getHourForecastDataSaga(action)
{
  yield put(actions.getHourForecastDataStart());
  const url = 'https://api.github.com/repos';
  const commits ='commits';
  try {
    console.log(action.cityName);
    console.log(action.dayName);
    const response = yield axios.get(`${url}/${action.cityName}/${action.dayName}/${commits}`);
    yield put(actions.setHourForecastData(response.data));
  } catch (error) {
    yield put(actions.fetchHourForecastDataFailed(error));
  }
}
