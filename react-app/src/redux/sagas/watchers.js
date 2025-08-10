import { takeLatest } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  addProductRequest,
  deleteProductRequest,
  updateProductRequest,
} from '../slice/ProductSlice';
import {
  fetchProductsWorker,
  addProductWorker,
  deleteProductWorker,
  updateProductWorker,
} from './workers';

export function* watchFetchProducts() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsWorker);
}

export function* watchDeleteProduct() {
  yield takeLatest(deleteProductRequest.type, deleteProductWorker);
}

export function* watchAddProduct() {
  yield takeLatest(addProductRequest.type, addProductWorker);
}

export function* watchUpdateProduct() {
  yield takeLatest(updateProductRequest.type, updateProductWorker);
}
