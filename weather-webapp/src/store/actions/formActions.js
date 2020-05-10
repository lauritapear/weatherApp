import * as actionTypes from './actionTypes';

export function handleCityNameChange(name) {
  return {type: actionTypes.HANDLE_CITY_NAME_CHANGE, name};
}

export function handleDayChange(name) {
  return {type: actionTypes.HANDLE_DAY_NAME_CHANGE, name};
}

export function onRestartForm() {
  return {type: actionTypes.RESTART_FORM};
}

export function onRestartClick() {
  return {type: actionTypes.RESTART_CLICK, };
}

export function onSearchClick() {
  return {type: actionTypes.SEARCH_CLICK, };
}
