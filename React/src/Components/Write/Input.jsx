import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CustomModal = ({
  closeModal,
  username,
  setShowAlert1,
  setShowAlertCategory,
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [value, setValue] = useState(false);
  const [addValue, setAddValue] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswers = (e) => {
    if (!answers) {
      setAnswers("• " + e.target.value);
    } else {
      setAnswers(e.target.value);
    }
  };

  const callCloseModal = async (e) => {
    e.preventDefault();
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
            title,
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

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>

      <div className="modal-container">
        <div>{username}</div>
        <div className="title-write">
          <label>Create Post</label>
        </div>
        <div className="inputfield">
          <textarea
            type="text"
            rows="3"
            name="question"
            value={question}
            onChange={handleQuestion}
            placeholder="What's on your mind?"
            className="question-write"
            required
          />
          <textarea
            type="text"
            rows="9"
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
          />
        </div>
        <div className="last-row">
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
          <div className="two-buttons">
            <button onClick={closeModal} className="btn-write-in-cancel">
              Cancel
            </button>
            <button onClick={callCloseModal} className="btn-write-in">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
