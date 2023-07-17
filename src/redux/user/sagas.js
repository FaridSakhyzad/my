import { call, put, takeEvery } from 'redux-saga/effects'
import Cookie from 'js-cookie';
import {
  CREATE_USER,
  LOGIN_USER,
  GET_USER,
  LOGOUT_USER,
} from './constants';

import {
  loginStart,
  loginFail,
  loginSuccess,
  getUserStart,
  getUserFail,
  getUserSuccess,
  getUserStop,
  loginAbort,
} from './actions';

import { getUser, createUser, loginUser, logoutUser } from '../../api/user';

export function* getUserSaga() {
  yield put(getUserStart());

  const { data: { user, errors } } = yield call(getUser);

  if (errors && errors.length > 0) {
    yield put(getUserFail(errors[0].message));

    return errors;
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

  if (!data.user) {
    yield put(loginAbort());
    return;
  }

  yield put(loginSuccess(data.user));

  const { authToken } = data.user;
  Cookie.set('token', authToken, { domain: 'localhost' });
}

export function* logoutUserSaga() {
  const { data } = yield call(logoutUser);
}

export function* watchUserSagas() {
  yield takeEvery(CREATE_USER, createUserSaga)
  yield takeEvery(LOGIN_USER, loginUserSaga)
  yield takeEvery(LOGOUT_USER, logoutUserSaga)
  yield takeEvery(GET_USER, getUserSaga)
}
