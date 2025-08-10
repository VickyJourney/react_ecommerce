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
import API from '../constants/constants';
// import {
//   getProducts,
//   addProduct,
//   deleteProduct,
// } from '../../utils/ProductsAPI';

export function* fetchProductsWorker() {
  try {
    const response = yield call(fetch, API.URL_PRODUCTS);
    const data = yield response.json();
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* deleteProductWorker(action) {
  try {
    yield call(fetch, `${API.URL_PRODUCTS}/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

export function* addProductWorker(action) {
  try {
    const response = yield call(fetch, API.URL_PRODUCTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();
    yield put(addProductSuccess(data));
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

export function* updateProductWorker(action) {
  try {
    const response = yield call(
      fetch,
      `${API.URL_PRODUCTS}/${action.payload.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
      }
    );
    const data = yield response.json();
    yield put(updateProductSuccess(data));
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}
