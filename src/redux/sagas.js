import { all } from 'redux-saga/effects'

import {
  watchUserSagas
} from './user/sagas';

export default function* rootSaga() {
  yield all([
    watchUserSagas()
  ])
}
