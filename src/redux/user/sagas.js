import { call, takeEvery } from 'redux-saga/effects'
import {CREATE_USER, LOGIN_USER, GET_USER} from './constants';
import { getUser, createUser, loginUser } from '../../api/user';

export function* getUserSaga() {
  const result = yield call(getUser);

  console.log('getUserSaga', result);
}

export function* createUserSaga({ payload }) {
  const result = yield call(createUser, payload);
  console.log('createUserSaga result', result);
}

export function* loginUserSaga({ payload }) {
  const result = yield call(loginUser, payload);
  console.log('loginUserSaga result', result);
}

export function* watchUserSagas() {
  yield takeEvery(GET_USER, getUserSaga)
  yield takeEvery(CREATE_USER, createUserSaga)
  yield takeEvery(LOGIN_USER, loginUserSaga)
}
