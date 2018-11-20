export const types = {
  RANDOM_ORDER: "RANDOM_ORDER",
};

const INITIAL_STATE = {
  stringToRender: "Winter is coming",
  doRandom: true,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RANDOM_ORDER:
      return { ...state, doRandom: true };
    default:
      return state;
  }
};

export const actions = {
  randomize: data => ({ type: types.RANDOM_ORDER, data }),
};
