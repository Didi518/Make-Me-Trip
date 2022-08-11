import { configureStore } from '@reduxjs/toolkit';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';
import appApi from './services/appApi';
// sauvegarde&restitution du store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blackList: [appApi.reducerPath, 'products'],
};

// persist le store
const persistedReducer = persistReducer(persistConfig, reducer);

// création du store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
