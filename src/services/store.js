import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStotrage from '@react-native-async-storage/async-storage';
import AuthSlice from './reducer/AuthSlice';
const rootReducer = combineReducers({
  auth: AuthSlice,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStotrage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});
export const persistor = persistStore(store);
