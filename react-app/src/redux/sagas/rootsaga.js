import { all } from 'redux-saga/effects';
import {
  watchFetchProducts,
  watchDeleteProduct,
  watchAddProduct,
  watchUpdateProduct,
} from '../sagas/watchers';

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchDeleteProduct(),
    watchAddProduct(),
    watchUpdateProduct(),
  ]);
}
