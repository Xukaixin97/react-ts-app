import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './components/Todo/TodoSlice';
import todoPersistReducer from './components/TodoPersist/TodoSlice';

const persistConfig = {
  key: 'todo',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  todoPersist: persistReducer(persistConfig, todoPersistReducer),
  todo: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
