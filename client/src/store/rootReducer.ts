import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "~/store/slices/appSlice";
import authReducer from "~/store/slices/authSlice";
import conversationReducer from "~/store/slices/conversationSlice";

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
});

export default rootReducers;
