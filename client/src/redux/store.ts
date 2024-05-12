import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/AuthSlice'; // Припустимо, що ваш файл називається authSlice.ts або authSlice.js
import {reducer as projectReducer} from './slices/ProjectSlice'
import {reducer as memberReducer} from './slices/MemberSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    project:projectReducer, 
    member: memberReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;