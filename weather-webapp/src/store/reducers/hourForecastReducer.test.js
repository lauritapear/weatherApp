import {repoCommitsReducer} from './repoCommitsReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Repo Commits Reducer', () =>{
  const dataToTest = [
        {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} },
        {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} },
        {author: {avatar_url:'someUrl'}, commit:{message:'someMsg', author:{name:'Author'}} }
  ];

  it('should have initial state', () =>{
    expect(repoCommitsReducer(undefined,{})).toEqual({
      loadingCommits: false,
      errorCommits: false,
      commitsData: []
    });
  })

  it('should store Commitsdata on sucess request', () =>{
    expect(repoCommitsReducer({
      loadingCommits: false,
      errorCommits: false,
      commitsData: []
    }, {
      type: actionTypes.SET_REPO_COMMITS_DATA,
      reposData: dataToTest
    })).toEqual({
      loadingCommits: false,
      errorCommits: false,
      commitsData: dataToTest
    })
  })

  it('should set loading to true when request has been sent', () =>{
    expect(repoCommitsReducer({
      loadingCommits: false,
      errorCommits: false,
      commitsData: []
    }, {
      type: actionTypes.GET_REPO_COMMITS_DATA_START
    })).toEqual({
      loadingCommits: true,
      errorCommits: false,
      commitsData: []
    })
  })

  it('should set error to true and clear loading when request has failed', () =>{
    expect(repoCommitsReducer({
      loadingCommits: true,
      errorCommits: false,
      commitsData: []
    }, {
      type: actionTypes.FETCH_REPO_COMMITS_DATA_FAIL
    })).toEqual({
      loadingCommits: false,
      errorCommits: true,
      commitsData: []
    })
  })

  it('should clear all data when restart had been requested', () =>{
    expect(repoCommitsReducer({
      loadingCommits: false,
      errorCommits: true,
      commitsData: dataToTest
    }, {
      type: actionTypes.RESTART_REPO_COMMITS_DATA
    })).toEqual({
      loadingCommits: false,
      errorCommits: false,
      commitsData: []
    })
  })
  });
