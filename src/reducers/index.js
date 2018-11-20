import { combineReducers } from "redux";
import answersReducer from "./answers";
import optionsReducer from "./options";
import initialReducer from "./initial";

const appReducer = combineReducers({
  answers: answersReducer,
  options: optionsReducer,
  initial: initialReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
