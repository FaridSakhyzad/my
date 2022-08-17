import { call, takeEvery } from 'redux-saga/effects'
import { GET_USER } from './constants';
import { getUser } from '../../api/user';

export function* getUserSaga() {
  const result = yield call(getUser);

  console.log('getUserSaga');

  console.log(result);
}

export function* watchUserSagas() {
  yield takeEvery(GET_USER, getUserSaga)
}
