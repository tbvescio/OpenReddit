import { combineReducers } from "redux";
import authReducer from "./auth";
import themeReducer from "./theme";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
