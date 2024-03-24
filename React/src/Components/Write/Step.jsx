import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message } from "antd";
import CustomModalQuestion from "./CustomModalQuestion";
import Dropdown from "../Dropdown/Dropdown";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomModalAnswer from "./CustomModelAnswer";
import { useDispatch, useSelector } from "react-redux";
import { sendQuestion } from "../../Store/DataQuestion/action";
import { sendAnswer } from "../../Store/DataAnswer/action";
import { useNavigate } from "react-router";

const StepsDesign = ({
  username,
  setShowAlert1,
  setShowAlert,
  questionId,
  setShowAlertCategory,
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
  const [title, setTitle] = useState("C++");
  const [commentOBJ, setCommentOBJ] = useState({});
  const [editAnswers, setEditAnswers] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();
  const dataQuestion = useSelector((state) => state.dataQuestion);

  const next = () => {
    setCurrent(current + 1);
  };
  // console.log("Question", questionData);
  const prev = () => {
    setCurrent(current - 1);
  };

  const fetchComments = async () => {
    console.log(cid);
    try {
      const res = await axios.get(
        `http://localhost:5000/user/getcommentbyid?comment_id=${cid}`
      );

      const data = res.data.comment_data;
      console.log("data", data);
      setCommentOBJ(res.data.comment_data);
      setEditAnswers(
        data.edited_comment === "none" ? data.comment : data.edited_comment
      );
      // dispatch(
      //   sendAnswer(
      //     data.edited_comment === "none" ? data.comment : data.edited_comment
      //   )
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [cid]);

  useEffect(() => {
    const callCloseEditModal = async () => {
      try {
        await axios.post(`http://localhost:5000/admin/cheackeditanswer`, {
          cusername: username,
          editAnswers,
          comment_id: commentOBJ._id,
          question_id: commentOBJ.question_id,
          grant: "none",
        });
        setShowAlert(true);
      } catch (error) {
        console.log(error);
      }
      onCancel();
    };

    const callCloseQuestionModal = async () => {
      console.log("Question", dataQuestion.question);
      console.log("Answers", answer);
      try {
        console.log("title", title);
        if (!title) {
          setShowAlertCategory(true);
        }
        if (title) {
          const response = await axios.post(
            "http://localhost:5000/user/question",
            {
              question: dataQuestion.question,
              username,
              title: "C++",
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
              setShowAlert1(true);
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

    if (editAns === undefined) {
      callCloseQuestionModal();
    }
    if (done === true) {
      console.log("Hii");
      callCloseEditModal();
    }
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
        // setNextCommentData(res.data.question_comment);
        // setCommentData("");
      } catch (error) {
        console.log(error);
      }
    };
    if (comment) {
      change();
    }
  }, [done]);

  const contentStyle = {
    textAlign: "center",
    marginTop: 16,
    marginBottom: "5rem",
  };

  let steps = null;
  if (comment || editAns) {
    steps = [
      {
        title: "Answer",
        content: (
          <CustomModalAnswer
            // closeModal={closeModal}
            username={username}
            setShowAlert1={setShowAlert1}
            setShowAlertCategory={setShowAlertCategory}
            setAnswer={setAnswer}
            questionData={questionData}
            comment={comment}
            editAns={editAns}
            editAnswers={editAnswers}
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
            setShowAlert1={setShowAlert1}
            setShowAlertCategory={setShowAlertCategory}
            setQuestion={setQuestion}
          />
        ),
      },
      {
        title: "Answer",
        content: (
          <CustomModalAnswer
            username={username}
            setShowAlert1={setShowAlert1}
            setShowAlertCategory={setShowAlertCategory}
            setAnswer={setAnswer}
          />
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
