import { CID } from "./actionType";

const dataCID= (state = '', action) => {
  switch (action.type) {
    case CID:
      return action.payload;
    default:
      return state;
  }
};

export default dataCID;
