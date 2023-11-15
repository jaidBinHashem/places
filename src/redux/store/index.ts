import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {placesSlice} from '../slice/placesSlice';

const middlewares = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const rootReducer = combineReducers({
  places: placesSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
