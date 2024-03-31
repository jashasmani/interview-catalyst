import React from "react";
import { Avatar } from "antd";
import AnswerEditorText from "../EditorText/AnswerEditorText";
import getUsernameColor from "../Functions/Avtar";

const CustomModalAnswer = ({
  username,
  setShowAlert1,
  setShowAlertCategory,
  setAnswer,
  questionData,
  comment,
  editAns,
  editAnswers
}) => {
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
          {comment || editAns ? (
            <div
              className="ql-toolbar ql-snow"
              style={{
                borderRadius: "0.5rem",
                display: "flex",
                marginBottom: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: questionData }}></div>
            </div>
          ) : (
            ""
          )}
          <AnswerEditorText
            placeholder={"Write your answer..."}
            setAnswer={setAnswer}
            editAnswers={editAnswers}
            editAns={editAns}
          />
        </div>
      </div>
    </>
  );
};

export default CustomModalAnswer;
