import {formReducer} from './formReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Form Reducer', () =>{
  it('should have initial state', () =>{
    expect(formReducer(undefined,{})).toEqual({
      cityName: '',
      dayName: '',
      showRepos: false
    });
  })

  it('should update city name when handle org name action has been dispatched', () =>{
    expect(formReducer({
      cityName: '',
      dayName: '',
      showRepos: false
    }, {
      type: actionTypes.HANDLE_CITY_NAME_CHANGE,
      name: 'someName'
    })).toEqual({
      cityName: 'someName',
      dayName: '',
      showRepos: false
    })
  })

  it('should update day name when handle day name action has been dispatched', () =>{
    expect(formReducer({
      cityName: '',
      dayName: '',
      showRepos: false
    }, {
      type: actionTypes.HANDLE_DAY_NAME_CHANGE,
      name: 'someName'
    })).toEqual({
      cityName: '',
      dayName: 'someName',
      showRepos: false
    })
  })

  it('should update show repos on search click', () =>{
    expect(formReducer({
      cityName: '',
      dayName: '',
      showRepos: false
    }, {
      type: actionTypes.SEARCH_CLICK,
      showRepos: 'true'
    })).toEqual({
      cityName: '',
      dayName: '',
      showRepos: true
    })
  })

  it('should clear data when restart action has been dispatched', () =>{
    expect(formReducer({
      cityName: 'someName',
      dayName: 'someName',
      showRepos: true
    }, {
      type: actionTypes.RESTART_FORM
    })).toEqual({
      cityName: '',
      dayName: '',
      showRepos: false
    })
  })
});
