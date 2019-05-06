import { combineReducers } from "redux";
import localeReducer from "./localeReducer";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  locale: localeReducer,
  location: localeReducer,
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
