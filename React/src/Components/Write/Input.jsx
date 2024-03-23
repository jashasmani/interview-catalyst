import React, { useState } from "react";
import { Modal } from "antd";
import EditNoteIcon from "@mui/icons-material/EditNote";

import Step from "./Step";

const Input = ({
  closeModal,
  username,
  setShowAlert1,
  setShowAlertCategory,
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={showModal}>
        <EditNoteIcon style={{ fontSize: "2.2rem" }} />
      </span>
      <Modal
        onCancel={handleCancel}
        open={open}
        centered
        width={750}
        footer={null}
        // style={{ maxHeight: "70vh" }}
      >
        <div className="editer-fix" style={{ marginBottom: "0rem" }}>
          <Step
            closeModal={closeModal}
            username={username}
            setShowAlert1={setShowAlert1}
            setShowAlertCategory={setShowAlertCategory}
          />
        </div>
      </Modal>
    </>
  );
};

export default Input;
