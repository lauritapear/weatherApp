import { cloneableGenerator } from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import {getRepoCommitsDataSaga} from './repoCommitsSaga';

describe('Commits Saga', () =>{
  const generator = getRepoCommitsDataSaga();

  it('should yield getRepoCommitsDataStart', () =>{
    expect(generator.next().value).toEqual(put({"type": "GET_REPO_COMMITS_DATA_START"}));
  })
});
