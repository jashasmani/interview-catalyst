import { QUESTION } from "./actionType";

const dataReducer = (state = '', action) => {
  switch (action.type) {
    case QUESTION:
      return action.payload;
    default:
      return state;
  }
};

export default dataReducer;
