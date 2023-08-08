import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import contactsReducer from './contacts/contactsSlice';
import filterReducer from './filter/filterSlice';
import modalReducer from './modal/modalSlice';
import authReducer from './auth/authSlice';
import { IAuthState } from '../common/models';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const filterPersistConfig = {
  key: 'filter',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer<IAuthState>(authPersistConfig, authReducer),
  contacts: contactsReducer,
  filter: persistReducer(filterPersistConfig, filterReducer),
  isModalOpen: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
