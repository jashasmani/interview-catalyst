import React, { useState } from "react";
import { Modal } from "antd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SendIcon from "@mui/icons-material/Send";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Step from "./Step";
import { useDispatch } from "react-redux";
import { sendAnswer } from "../../Store/DataAnswer/action";

const Input = ({
  username,
  setShowAlert1,
  setShowAlertCategory,
  comment,
  questionData,
  editAns,
  cid,
  questionId,
  closeModal
}) => {
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch()


  const showModal = () => {
    console.log('cid',cid)
    setOpen(true);
  };

  const handleCancel = () => {
    // dispatch(sendAnswer(''))
    // closeModal()
    setOpen(false);
  };

  return (
    <>
      <span onClick={showModal}>
        {comment ? (
          <SendIcon />
        ) : editAns ? (
          <BorderColorIcon style={{ marginRight: "0rem", cursor: "pointer" }} />
        ) : (
          <EditNoteIcon style={{ fontSize: "2.2rem" }} />
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
            setShowAlert1={setShowAlert1}
            setShowAlertCategory={setShowAlertCategory}
            onCancel={handleCancel}
            comment={comment}
            editAns={editAns}
            questionData={questionData}
            cid={cid}
            questionId={questionId}
          />
        </div>
      </Modal>
    </>
  );
};

export default Input;
