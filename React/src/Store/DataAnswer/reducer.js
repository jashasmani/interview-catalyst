import { ANSWER } from "./actionType";

const dataReducer = (state = '', action) => {
  switch (action.type) {
    case ANSWER:
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
