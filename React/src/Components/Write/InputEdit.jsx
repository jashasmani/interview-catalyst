import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import CustomModalAnswer from "./CustomModelAnswer";
import { Button, message } from "antd";

const Input = ({
  username,
  //   comment,
  questionData,
  questionId,
  open,
  handleCancel,
  editAns,
  cid,
}) => {
  const [answer, setAnswer] = useState(null);
  const [commentOBJ, setCommentOBJ] = useState({});
  const [editAnswers, setEditAnswers] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    console.log(cid);
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/user/getcommentbyid?comment_id=${cid}`
        );

        const data = res.data.comment_data;
        // console.log("data", data);
        setCommentOBJ(res.data.comment_data);
        const editedAnswer =
          data.edited_comment === "none" ? data.comment : data.edited_comment;
        setEditAnswers(editedAnswer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [cid]);

  const callCloseEditModal = async () => {
    try {
      await axios.post(`https://interview-catalyst.onrender.com/admin/cheackeditanswer`, {
        cusername: username,
        editAnswers: answer,
        comment_id: commentOBJ._id,
        question_id: commentOBJ.question_id,
        grant: "none",
      });
      console.log("Hii");

      // setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (done === true) {
      callCloseEditModal();
    }
  }, [done]);

  return (
    <>
      <Modal
        onCancel={handleCancel}
        open={open}
        centered
        width={750}
        footer={null}
      >
        <div style={{ height: "29rem" }}>
          <div className="question-title">
            <h2>Edit Answer</h2>
          </div>
          <div className="editer-fix">
            <CustomModalAnswer
              username={username}
              setAnswer={setAnswer}
              questionData={questionData}
              editAns={editAns}
              editAnswers={editAnswers}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            type="primary"
            onClick={(e) => {
              callCloseEditModal();
              message.success("Edit Request Sent Successfuly!!");
              // setDone(true);
              handleCancel();
            }}
          >
            Done
          </Button>
          <Button onClick={handleCancel} style={{ marginRight: "0.7rem" }}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Input;
