import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function * getHourForecastDataSaga(action)
{
  yield put(actions.getHourForecastDataStart());
  const url = 'http://localhost:5200/api/forecast/twelveHours';
  try {
    const response = yield axios.get(url, {
      params: {
        cityName: action.cityName,
      },
    });
    yield put(actions.setHourForecastData(response.data));
  } catch (error) {
    yield put(actions.fetchHourForecastDataFailed(error));
  }
}
