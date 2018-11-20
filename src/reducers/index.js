import { combineReducers } from "redux";
import answersReducer from "./answers";
import optionsReducer from "./options";
import initialReducer from "./initial";

export default combineReducers({
  answers: answersReducer,
  options: optionsReducer,
  initial: initialReducer,
});
