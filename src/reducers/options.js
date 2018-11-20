// optionsTypes
export const types = {
  CLICK: "CLICK",
  GET_OPTION: "GET_OPTION",
  SET_OPTION: "SET_OPTION",
  DELETE_OPTION: "DELETE_OPTION",
};

// optionsReducer
const INITIAL_STATE = {
  opt: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DELETE_OPTION: {
      return {
        ...state,
        opt:
          action.index !== -1
            ? [...state.opt.slice(0, action.index), ...state.opt.slice(action.index + 1)]
            : state.opt,
      };
    }
    case types.GET_OPTION:
      return state.opt[action.index];
    case types.SET_OPTION:
      return { ...state, opt: action.data };
    default:
      return state;
  }
};

// optionsAction
export const actions = {
  deleteOptions: index => ({ type: types.DELETE_OPTION, index }),
  getOption: word => ({ type: types.GET_OPTION, word }),
  setOptions: data => ({ type: types.SET_OPTION, data }),
};
