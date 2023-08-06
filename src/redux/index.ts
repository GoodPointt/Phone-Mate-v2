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
import sortReducer from './sort/sortSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  isModalOpen: modalReducer,
  sort: sortReducer,
});

const persistConfig = {
  key: 'PHONE_MATE_KEY',
  storage,
  blacklist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
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
