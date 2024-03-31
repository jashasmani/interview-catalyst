import { CID } from "./actionType";

export const sendCID = (cid) => ({
  type: CID,
  payload: { cid },
});
