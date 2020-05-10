import {combineReducers} from 'redux';
import {dayForecastReducer} from './dayForecastReducer';
import {hourForecastReducer} from './hourForecastReducer';
import {formReducer} from './formReducer';

const rootReducer = combineReducers(
  {
    dayForecastReducer,
    formReducer,
    hourForecastReducer
  }
);

export default rootReducer;
