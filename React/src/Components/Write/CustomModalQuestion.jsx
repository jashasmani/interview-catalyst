import React, { useState } from "react";
import { Avatar } from "antd";
import QuestionEditorText from "../EditorText/QuestionEditorText";
import getUsernameColor from "../Functions/Avtar";

const CustomModalQuestion = ({
  closeModal,
  username,
  setShowAlert1,
  setShowAlertCategory,
  setQuestion,
}) => {
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.post(`http://localhost:5000/user/addcategory`, {
  //       title,
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const backgroundColor = getUsernameColor(username);

  return (
    <>
      <div className="connect">
        <div className="connect1">
          <Avatar
            style={{
              backgroundColor: backgroundColor,
              color: "#ffffff",
              fontSize: "1.3rem",
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className="inputfield">
          <QuestionEditorText
            placeholder={"Write your question.."}
            setQuestion={setQuestion}
          />
        </div>
      </div>
    </>
  );
};

export default CustomModalQuestion;
