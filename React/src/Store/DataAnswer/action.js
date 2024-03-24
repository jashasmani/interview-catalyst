import { ANSWER } from "./actionType";

export const sendAnswer = (answer) => ({
  type: ANSWER,
  payload: { answer },
});
