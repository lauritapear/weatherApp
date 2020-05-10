import {formReducer} from './formReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Form Reducer', () =>{
  it('should have initial state', () =>{
    expect(formReducer(undefined,{})).toEqual({
      organizationName: '',
      repoName: '',
      showRepos: false
    });
  })

  it('should update organization name when handle org name action has been dispatched', () =>{
    expect(formReducer({
      organizationName: '',
      repoName: '',
      showRepos: false
    }, {
      type: actionTypes.HANDLE_ORGANIZATION_NAME_CHANGE,
      name: 'someName'
    })).toEqual({
      organizationName: 'someName',
      repoName: '',
      showRepos: false
    })
  })

  it('should update repo name when handle repo name action has been dispatched', () =>{
    expect(formReducer({
      organizationName: '',
      repoName: '',
      showRepos: false
    }, {
      type: actionTypes.HANDLE_REPO_NAME_CHANGE,
      name: 'someName'
    })).toEqual({
      organizationName: '',
      repoName: 'someName',
      showRepos: false
    })
  })

  it('should update show repos on search click', () =>{
    expect(formReducer({
      organizationName: '',
      repoName: '',
      showRepos: false
    }, {
      type: actionTypes.SEARCH_CLICK,
      showRepos: 'true'
    })).toEqual({
      organizationName: '',
      repoName: '',
      showRepos: true
    })
  })

  it('should clear data when restart action has been dispatched', () =>{
    expect(formReducer({
      organizationName: 'someName',
      repoName: 'someName',
      showRepos: true
    }, {
      type: actionTypes.RESTART_FORM
    })).toEqual({
      organizationName: '',
      repoName: '',
      showRepos: false
    })
  })
});
