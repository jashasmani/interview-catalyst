import axios from "axios";
import React, { useState } from "react";
import { Avatar } from "antd";
import QuestionEditorText from "../EditorText/QuestionEditorText";
import AnswerEditorText from "../EditorText/AnswerEditorText";

const CustomModal = ({
  closeModal,
  username,
  setShowAlert1,
  setShowAlertCategory,
  current,
  done,
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [title, setTitle] = useState("C++");

  // console.log(question);
  // console.log(answers);

  if (done === "done") {
    const callCloseModal = async (e) => {
      try {
        console.log("title", title);
        if (!title) {
          setShowAlertCategory(true);
        }
        if (title) {
          const response = await axios.post(
            "http://localhost:5000/user/question",
            {
              question,
              username,
              title: "C++", 
              grant: "false",
            }
          );

          if (response.data.question_main._id !== "" && answers !== "") {
            try {
              await axios.post("http://localhost:5000/user/commentsubmit", {
                cusername: username,
                commentData: answers,
                question_id: response.data.question_main._id,
                edited_comment: "none",
                grant: false,
              });
              setShowAlert1(true);
              fetchData();
              closeModal();
            } catch (error) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    callCloseModal();
  }

  const fetchData = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/user/addcategory`, {
        title,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsernameColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    const saturation = 70;
    const lightness = 60;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
  };

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
          {current === 0 ? (
            <QuestionEditorText
              placeholder={"Write your question.."}
              setValueState={setQuestion}
            />
          ) : (
            <AnswerEditorText
              placeholder={"Write your answer..."}
              setValueState={setAnswers}
            />
          )}
          {/* 
            <textarea
              type="text"
              rows="4"
              name="question"
              value={question}
              onChange={handleQuestion}
              placeholder="What's on your mind?"
              className="question-write"
              required
            />
            <textarea
              type="text"
              rows="8"
              name="answer"
              value={answers}
              onChange={handleAnswers}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setAnswers((prevAnswers) => prevAnswers + "\n• ");
                }
              }}
              placeholder="Compose your answer here..."
              className="answer-write"
            /> */}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
