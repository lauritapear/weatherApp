import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function * getDayForecastDataSaga(action)
{
  yield put(actions.getDayForecastDataStart());
  const url = 'http://localhost:5200/api/forecast/fiveDays';
  // const repos ='repos';
  try {
    const response = yield axios.get(url, {
      params: {
        cityName: action.cityName,
      },
    });
    yield put(actions.setDayForecastData(response.data));
  } catch (error) {
    yield put(actions.fetchDayForecastDataFailed(error));
  }
}
