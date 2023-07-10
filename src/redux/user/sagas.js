import { call, put, takeEvery } from 'redux-saga/effects'
import Cookie from 'js-cookie';
import {
  CREATE_USER,
  LOGIN_USER,
  GET_USER,
} from './constants';
import {
  loginStart,
  loginFail,
  loginSuccess,
  getUserStart,
  getUserFail,
  getUserSuccess,
  getUserStop,
} from './actions';

import { getUser, createUser, loginUser } from '../../api/user';

export function* getUserSaga() {
  yield put(getUserStart());

  const { data, data: { user } } = yield call(getUser);

  if (data.errors && data.errors.length > 0) {
    yield put(getUserFail(data.errors[0].message));

    return data.errors;
  }

  if (user) {
    yield put(getUserSuccess(user))
  } else {
    yield put(getUserStop())
  }
}

export function* createUserSaga({ payload }) {
  const result = yield call(createUser, payload);
  console.log(result);
}

export function* loginUserSaga({ payload }) {
  yield put(loginStart());

  const { data } = yield call(loginUser, payload);

  if (data.errors && data.errors.length > 0) {
    yield put(loginFail(data.errors[0].message));

    return data.errors;
  }

  yield put(loginSuccess(data.user));

  const { authToken } = data.user;
  Cookie.set('token', authToken, { domain: 'localhost' });
}

export function* watchUserSagas() {
  yield takeEvery(CREATE_USER, createUserSaga)
  yield takeEvery(LOGIN_USER, loginUserSaga)
  yield takeEvery(GET_USER, getUserSaga)
}
