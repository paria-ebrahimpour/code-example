import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  user: userReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
