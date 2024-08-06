// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

// Create a root reducer
const rootReducer = combineReducers({ user: userReducer });

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(store);
