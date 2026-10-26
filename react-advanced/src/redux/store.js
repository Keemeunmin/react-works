import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import bankReducer from "./bankSlice";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bank: bankReducer,
    todo: todoReducer,
  },
});