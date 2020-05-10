import { cloneableGenerator } from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import {getDayForecastDataSaga} from './dayForecastSaga';

describe('Day Forecast Saga', () =>{
  const generator = getDayForecastDataSaga();
 
  it('should yield getDayForecastDataStart', () =>{
    expect(generator.next().value).toEqual(put({"type": "GET_DAY_FORECAST_DATA_START"}));
  })
});
