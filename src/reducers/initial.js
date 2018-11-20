export const types = {
  SHUFFLE_ORDER: "RANDOM_ORDER",
};

const INITIAL_STATE = {
  stringToRender: "Winter is coming",
  doRandom: true,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SHUFFLE_ORDER:
      return { ...state, doRandom: true };
    default:
      return state;
  }
};

export const actions = {
  shuffler: data => ({ type: types.SHUFFLE_ORDER, data }),
};
