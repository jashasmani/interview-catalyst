import dataQuestion from "./DataQuestion/reducer";
import dataAnswer from "./DataAnswer/reducer";
import dataCID from "./CID/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dataQuestion: dataQuestion,
  dataAnswer: dataAnswer,
  dataCID: dataCID,
});

export default rootReducer;
