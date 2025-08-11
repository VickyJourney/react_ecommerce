import { call, put } from 'redux-saga/effects';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProductSuccess,
  deleteProductFailure,
  addProductSuccess,
  addProductFailure,
  updateProductSuccess,
  updateProductFailure,
} from '../slice/ProductSlice';
import * as productAPI from '../../utils/ProductsAPI';

export function* fetchProductsWorker() {
  try {
    const response = yield call(productAPI.getProducts);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* deleteProductWorker(action) {
  try {
    yield call(productAPI.deleteProduct, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

export function* addProductWorker(action) {
  try {
    const response = yield call(productAPI.addProduct, action.payload);
    yield put(addProductSuccess(response.data));
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

export function* updateProductWorker(action) {
  try {
    const response = yield call(
      productAPI.updateProduct,
      action.payload.id,
      action.payload
    );
    yield put(updateProductSuccess(response.data));
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}
