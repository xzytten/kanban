import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/AuthSlice';
import { reducer as projectReducer } from './slices/ProjectSlice';
import { reducer as memberReducer } from './slices/MemberSlice';
import { reducer as taskReducer } from './slices/TaskSlice';

// Об'єднайте ред'юсери
const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  member: memberReducer,
  task: taskReducer,
});


const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = undefined; 
    localStorage.clear();
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
