import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utils';
const initialState1 = {
  cityName: '',
  dayName: '',
  showRepos: false
};

function handleCityNameChange(state, name) {
  return updateObject(state, {cityName: name});
}

function handleDayChange(state, name) {
  return updateObject(state, {dayName: name});
}

function onRestartForm(state) {
  return updateObject(state, {
    'showRepos': false,
    'cityName': '',
    'dayName': '',
  });
}

function onSearchClick(state) {
  return updateObject(state, {'showRepos': true});
}

export function formReducer(state = initialState1, action) {
  switch (action.type) {
    case actionTypes.HANDLE_CITY_NAME_CHANGE:
      return handleCityNameChange(state, action.name)
    case actionTypes.HANDLE_DAY_NAME_CHANGE:
      return handleDayChange(state, action.name)
    case actionTypes.RESTART_FORM:
      return onRestartForm(state)
    case actionTypes.SEARCH_CLICK:
      return onSearchClick(state)
    default:
      return state
  }
}
