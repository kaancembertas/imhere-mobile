const INITIAL_STATE = {
  role: 1, // 0: Student - 1: Instructor
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  return state;
};
