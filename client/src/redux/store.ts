import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/AuthSlice'; // Припустимо, що ваш файл називається authSlice.ts або authSlice.js

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;