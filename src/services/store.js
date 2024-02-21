import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStotrage from '@react-native-async-storage/async-storage';
import AuthSlice from './reducer/AuthSlice';
import CommonReducer from './reducer/CommonReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStotrage,
};
const rootReducer = combineReducers({
  auth: AuthSlice,
  commonStore: CommonReducer,
});
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
