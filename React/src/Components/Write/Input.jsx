import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Step from "./Step";
import { useDispatch } from "react-redux";
import { sendCID } from "../../Store/CID/action";

const Input = ({
  username,
  comment,
  questionData,
  questionId,
  editAns,
  cid,
}) => {
  const [open, setOpen] = useState(false);
  const [selectCID, setSelectCID] = useState(null);
  const dispatch = useDispatch();

  const showModal = () => {
    setSelectCID(cid);
    setOpen(true);
  };

  const handleCancel = () => {
    setSelectCID(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(sendCID(cid));
  }, [cid,dispatch]);

  return (
    <>
      <span onClick={showModal}>
        {comment ? (
          <SendIcon />
        ) : editAns ? (
          <BorderColorIcon style={{ marginRight: "0rem", cursor: "pointer" }} />
        ) : (
          <EditNoteIcon style={{ fontSize: "2.2rem", cursor: "pointer" }} />
        )}
      </span>
      <Modal
        onCancel={handleCancel}
        open={open}
        centered
        width={750}
        footer={null}
      >
        <div className="editer-fix">
          <Step
            username={username}
            onCancel={handleCancel}
            comment={comment}
            editAns={editAns}
            questionData={questionData}
            cid={selectCID}
            questionId={questionId}
          />
        </div>
      </Modal>
    </>
  );
};

export default Input;
