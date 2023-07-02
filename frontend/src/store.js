import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlices.jsx'
// import { api}

const store = configureStore({
  reducer: {
    auth : authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
