import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message } from "antd";
import CustomModalQuestion from "./CustomModalQuestion";
import Dropdown from "../Dropdown/Dropdown";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomModalAnswer from "./CustomModelAnswer";
import { sendQuestion } from "../../Store/DataQuestion/action";
import { sendAnswer } from "../../Store/DataAnswer/action";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const StepsDesign = ({
  username,
  questionId,
  onCancel,
  questionData,
  comment,
  editAns,
  cid,
}) => {
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(false);
  const [done, setDone] = useState(false);
  const [addValue, setAddValue] = useState(false);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [title, setTitle] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const dataQuestion = useSelector((state) => state.dataQuestion);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const callCloseQuestionModal = async () => {
      console.log("Question", dataQuestion.question);
      console.log("Answers", answer);
      try {
        console.log("title", title);
        if (!title) {
          // setShowAlertCategory(true);
        }
        if (title && dataQuestion.question ) {
          const response = await axios.post(
            "http://localhost:5000/user/question",
            {
              question: dataQuestion.question,
              username,
              title: title,
              grant: "false",
            }
          );

          if (response.data.question_main._id !== "" && answer !== "") {
            try {
              await axios.post("http://localhost:5000/user/commentsubmit", {
                cusername: username,
                commentData: answer,
                question_id: response.data.question_main._id,
                edited_comment: "none",
                grant: false,
              });
              // setShowAlert1(true);
              dispatch(sendQuestion(""));
              dispatch(sendAnswer(""));
              setCurrent(0)
              message.success("Add Request Sent Successfuly!!");
              nav("/main");
              // fetchData();
              onCancel();
            } catch (error) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const change = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/user/commentsubmit",
          {
            cusername: username,
            question_id: questionId,
            commentData: answer,
            edited_comment: "none",
          }
        );
        console.log(res.data);
        message.success("Comment Add Request Sent Successfuly!!");
        onCancel();

        // setNextCommentData(res.data.question_comment);
        // setCommentData("");
      } catch (error) {
        console.log(error);
      }
    };

    if (editAns === undefined) {
      callCloseQuestionModal();
    }

    if (comment) {
      change();
    }
  }, [done]);

  const contentStyle = {
    textAlign: "center",
    marginTop: 16,
    marginBottom: "5rem",
  };
  // console.log("edit",editAnswers );

  var steps = null;
  if (comment || editAns) {
    steps = [
      {
        title: "Answer",
        content: (
          <CustomModalAnswer
            username={username}
            setAnswer={setAnswer}
            questionData={questionData}
            comment={comment}
            editAns={editAns}
          />
        ),
      },
    ];
  } else {
    steps = [
      {
        title: "Question",
        content: (
          <CustomModalQuestion
            // closeModal={closeModal}
            username={username}
            setQuestion={setQuestion}
          />
        ),
      },
      {
        title: "Answer",
        content: (
          <CustomModalAnswer username={username} setAnswer={setAnswer} />
        ),
      },
    ];
  }

  return (
    <>
      <div className="question-title">
        <h2>
          {current === 0
            ? comment || editAns
              ? "Write Answer"
              : "Add Your Question"
            : "Write Answer"}
        </h2>
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="combo">
                <Dropdown
                  setValue={setValue}
                  text={text}
                  addValue={addValue}
                  setTitle={setTitle}
                />
                {value && (
                  <div className="input-button">
                    <input
                      type="text"
                      className="bottom-input"
                      placeholder="Add Subject"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div onClick={() => setAddValue(true)} className="add-item">
                      <AddCircleIcon style={{ fontSize: "2rem" }} />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    next();
                    dispatch(sendQuestion(question));
                  }}
                >
                  Next
                </Button>
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={onCancel}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={(e) => {
                // message.success("Processing complete!");
                setDone(true);
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => {
                prev();
                dispatch(sendAnswer(answer));
              }}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default StepsDesign;
