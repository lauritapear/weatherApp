import { cloneableGenerator } from 'redux-saga/utils';
import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';
import {handleRestartSaga} from './restartSaga';

describe('Restart Saga', () =>{
  const generator = handleRestartSaga();

  it('should yield restart for forms, org and commits', () =>{
    expect(generator.next().value).toEqual(put({"type": "RESTART_FORM"}));
    expect(generator.next().value).toEqual(put({"type": "RESTART_ORGANIZATION_DATA"}));
    expect(generator.next().value).toEqual(put({"type": "RESTART_REPO_COMMITS_DATA"}));
  })
});
