import { combineReducers } from "redux";
import authentication from "./authentication";
import snackbar from "./snackbar";

export default combineReducers({
  snackbar,
  authentication
});
