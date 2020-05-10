import { cloneableGenerator } from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import {getHourForecastDataSaga} from './hourForecastSaga';

describe('Hour Forecast Saga', () =>{
  const generator = getHourForecastDataSaga();

  it('should yield getHourForecastDataStart', () =>{
    expect(generator.next().value).toEqual(put({"type": "GET_HOUR_FORECAST_DATA_START"}));
  })
});
