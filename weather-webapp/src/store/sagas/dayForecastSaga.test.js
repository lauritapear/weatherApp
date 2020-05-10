import { cloneableGenerator } from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import {getOrganizationReposDataSaga} from './organizationRepoSaga';

describe('Organization Saga', () =>{
  const generator = getOrganizationReposDataSaga();
 
  it('should yield getOrganizationReposDataStart', () =>{
    expect(generator.next().value).toEqual(put({"type": "GET_ORGANIZATION_REPOS_DATA_START"}));
  })
});
