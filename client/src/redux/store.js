import { configureStore } from "@reduxjs/toolkit";  // Import configureStore from @reduxjs/toolkit
import useReducer from "./user/userSlice"; // Import the userSlice reducer

export const store = configureStore({ 
      
    reducer:{user:useReducer}, // Add a reducer key to the store configuration object
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),

 });// Create a store using configureStore