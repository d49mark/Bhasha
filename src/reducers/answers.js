// answersTypes
export const types = {
  INSERT_ANSWER: "INSERT_ANSWER",
  DELETE_ANSWER: "DELETE_ANSWER",
  CHECK_ANSWER: "CHECK_ANSWER",
  SET_CORRECT: "SET_CORRECT",
};

// answersReducer
const INITIAL_STATE = {
  ans: [],
  isCorrect: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INSERT_ANSWER:
      return { ...state, ans: [...state.ans, action.input] };
    case types.CHECK_ANSWER:
      return { ...state };
    case types.SET_CORRECT:
      return { ...state, isCorrect: action.value };
    default:
      return state;
  }
};

// answersActions
export const actions = {
  insert: input => ({ type: types.INSERT_ANSWER, input }),
  check: word => ({ type: types.GET_ANSWER, word }),
  delete: () => ({ type: types.DELETE_ANSWER }),
  setCorrect: value => ({ type: types.SET_CORRECT, value }),
};
