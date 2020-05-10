import {organizationReducer} from './organizationReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Organization Reducer', () =>{
  const dataToTest = [
        {name: "repo",  forks: 2 },
        {name: "repo",  forks: 5},
        {name: "repo",  forks: 3},
        {name: "repo",  forks: 20},
  ];

  it('should have initial state', () =>{
    expect(organizationReducer(undefined,{})).toEqual({
      loading: false,
      error: false,
      repoData: []
    });
  })

  it('should store Repo data on sucess request', () =>{
    expect(organizationReducer({
      loading: false,
      error: false,
      repoData: []
    }, {
      type: actionTypes.SET_ORGANIZATION_REPOS_DATA,
      reposData: dataToTest
    })).toEqual({
      loading: false,
      error: false,
      repoData: dataToTest
    })
  })

  it('should set loading to true when request has been sent', () =>{
    expect(organizationReducer({
      loading: false,
      error: false,
      repoData: []
    }, {
      type: actionTypes.GET_ORGANIZATION_REPOS_DATA_START
    })).toEqual({
      loading: true,
      error: false,
      repoData: []
    })
  })

  it('should set error to true and clear loading when request has failed', () =>{
    expect(organizationReducer({
      loading: true,
      error: false,
      repoData: []
    }, {
      type: actionTypes.FETCH_ORGANIZATION_REPOS_DATA_FAIL
    })).toEqual({
      loading: false,
      error: true,
      repoData: []
    })
  })

  it('should clear all data when restart had been requested', () =>{
    expect(organizationReducer({
      loading: true,
      error: true,
      repoData: dataToTest
    }, {
      type: actionTypes.RESTART_ORGANIZATION_DATA
    })).toEqual({
      loading: false,
      error: false,
      repoData: []
    })
  })
});
