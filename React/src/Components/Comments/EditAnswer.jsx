import React, { useState, useEffect } from "react";
import axios from "axios";
// import * as React from 'react';
// import Alert from "@mui/material/Alert";
// import CheckIcon from "@mui/icons-material/Check";

const CustomModal = ({ setShowAlert, closeModal, cid, questionData }) => {
  const [cusername, setCUsername] = useState("");
  const [commentOBJ, setCommentOBJ] = useState({});
  const [editAnswers, setEditAnswers] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/GetCommentById?comment_id=${cid}`
        );

        const data=res.data.comment_data;
        setCommentOBJ(res.data.comment_data);
        setEditAnswers(data.edited_comment==='none'?data.comment:data.edited_comment);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [cid]);

  const handleAnswers = (e) => {
    setEditAnswers(e.target.value);
  };

  // const renderHighlightedText = () => {
  //   const words1 = answer.split(/\s+/);
  //   const words2 = editAnswers.split(/\s+/);

  //   return words2.map((word) => {
  //     if (!words1.includes(word)) {
  //       return (
  //         <div style={{ color: "green", whiteSpace: "pre-line" }}>{word}</div>
  //       );
  //     }
  //     return word + "  ";
  //   });
  // };

  const callCloseModal = async (e) => {
    e.preventDefault();
    try {
      // const res =
      await axios.post(`http://localhost:5000/admin/cheackeditanswer`, {
        cusername,
        editAnswers,
        comment_id: commentOBJ._id,
        question_id: commentOBJ.question_id,
        grant: "none",
      });
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching login...");

      try {
        const res = await axios.get("http://localhost:5000/user/login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCUsername(res.data.cusername);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>

      <div className="modal-container">
        <div>Name</div>
        <div className="title-write">
          <label>Edit Answer</label>
        </div>
        <div className="inputfield">
          <label className="question-write">{questionData}</label>
          <textarea
            type="text"
            rows="9"
            name="answer"
            value={editAnswers}
            onChange={handleAnswers}
            placeholder="Compose your answer here..."
            className="answer-write"
          />
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
    </>
  );
};

export default CustomModal;
