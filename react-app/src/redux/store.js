import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productsReducer from './slice/ProductSlice';
import rootSaga from './sagas/rootsaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
