const state = {};

export const saveState = (id, scrollY) => {
  state[id] = scrollY;
};

export const getState = (id) => {
  return state[id];
};
