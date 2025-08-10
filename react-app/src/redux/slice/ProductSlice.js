import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.loading = false;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductRequest: (state) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
