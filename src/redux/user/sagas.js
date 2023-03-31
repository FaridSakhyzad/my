import { call, put, takeEvery } from 'redux-saga/effects'
import Cookie from 'js-cookie';
import {
  GET_USER,
  CREATE_USER,
  LOGIN_USER,
  GET_USER_PROFILE,
} from './constants';
import { getUserProfileStart, getUserProfileFail, getUserProfileSuccess } from './actions';

import { getUser, createUser, loginUser, getUserProfile } from '../../api/user';

export function* getUserSaga() {
  const result = yield call(getUser);

  console.log('getUserSaga', result);
}

export function* createUserSaga({ payload }) {
  const result = yield call(createUser, payload);
  console.log('createUserSaga result', result);
}

export function* loginUserSaga({ payload }) {
  const { data } = yield call(loginUser, payload);
  if (data.errors && data.errors.length > 0) {
    return data.errors;
  }

  const { authToken } = data.user;

  Cookie.set('authToken', authToken, { domain: 'localhost' })
}

export function* getUserProfileSaga() {
  yield put(getUserProfileStart());

  try {
    const { data } = yield call(getUserProfile);

    if (data.user && data.user.id) {
      yield put(getUserProfileSuccess(data));
    }

    console.log('getUserProfileSaga', data);
  } catch (error) {
    yield put(getUserProfileFail(error));
  }
}

export function* watchUserSagas() {
  yield takeEvery(CREATE_USER, createUserSaga)
  yield takeEvery(LOGIN_USER, loginUserSaga)
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga)
  yield takeEvery(GET_USER, getUserSaga)
}
