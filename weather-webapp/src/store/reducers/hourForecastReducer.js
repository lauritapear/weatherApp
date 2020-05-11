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
  let sortedData = hourForecastData;
  console.log("insideReducer: ", hourForecastData)
  let newData = [];
  sortedData.forEach(element => {
    let iconIndex= getIconNumber(element.WeatherIcon)
    let icon = `http://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${iconIndex}-s.png`
    newData.push({
      Time: getTime(element.DateTime),
      Value: getTempValue(element.Temperature),
      Icon: icon
    });
  });
  return updateObject(state, {
    'hourForecastData': newData,
    'loadingHourForecast': false});
}

function getIconNumber(number){
  let iconIdex;
  if(number < 10)
  {
    iconIdex= `0${number}`
  }else{
    iconIdex=number;
  }
  return iconIdex;
}

function getTime(date){
  // let time = (new Date(date).getHours() + 24) % 12 || 12;
  let time = new Date(date);
  time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
  // if(time >)
  return time.toString();
}

function getTempValue(temp){
  let value = temp.Value
  return value;
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
