import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice.jsx'
import { apiSlice } from './slices/apiSlice.js'

const store = configureStore({
  reducer: {
    auth : authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
