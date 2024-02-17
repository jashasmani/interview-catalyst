import React, { useState, useEffect } from "react";
import "../../CSS/Admin_cheack_Ans.css";
import "../../../Message/CSS/AllQuestion.css";

import axios from "axios";

function Adminn_Cheack_Ans({ data, setRefereshData }) {
  const [questionValue, setQuestionValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/user/questionbyid?question_id=${data.question_id}`
        );
        // console.log(res.data);
        setQuestionValue(res.data.question_value.question);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnswer();
  }, [data.question_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/user/GetCommentById?comment_id=${data.comment_id}`
        );
        const dataone = res.data.comment_data;
        setCommentValue(
          dataone.edited_comment === "none"
            ? dataone.comment
            : dataone.edited_comment
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [data.comment_id]);
  const renderHighlightedText = () => {
    const sentences1 = commentValue.split(/\.|\?|!/);
    const sentences2 = data.edit_answer.split(/\.|\?|!/);
  
    const highlightedSentences = sentences2.map((sentence, index) => {
      const words1 = sentences1[index] ? sentences1[index].split(/\s+/) : [];
      const words2 = sentence.split(/\s+/);
  
      const highlightedWords = words2.map((word, index) => {
        if (words1.length === 0 || !words1.includes(word)) {
          return (
            <span
              key={index}
              style={{ color: "green", whiteSpace: "pre-line" }}
            >
              {word + " "}
            </span>
          );
        }
        return (
          <span key={index} style={{ whiteSpace: "pre-line" }}>
            {word + " "}
          </span>
        );
      });
      return <p key={index}>{highlightedWords}</p>;
    });
  
    return highlightedSentences;
  };
  
  

  // const renderHighlightedText = () => {
  //   const words1 = commentValue.split(/\s+/);
  //   const words2 = data.edit_answer.split(/\s+/);

  //   return words2.map((word, index) => {
  //     if (!words1.includes(word)) {
  //       return (
  //         <span key={index} style={{ color: "green", whiteSpace: "pre-line" }}>
  //           {word}{" "}
  //         </span>
  //       );
  //     } else {
  //       return (
  //         <span key={index} style={{ whiteSpace: "pre-line" }}>
  //           {word}{" "}
  //         </span>
  //       );
  //     }
  //   });
  // };

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/admin/findEditedAnswer`
        );
        console.log(res.data.edit_answer_id);
        // setQuestionID(res.data.edit_answer_id);
      } catch (error) {
        console.log(error);
      }
    };
    // fetchAnswer();
  });

  const cheackGrant = async (value, id) => {
    try {
      // const res =
      await axios.post(`https://interview-catalyst.onrender.com/admin/updategrant`, {
        _id: id,
        grant: value,
        edited_answer: data.edit_answer,
        comment_id: data.comment_id,
      });
      setRefereshData(true);
      // console.log("123456")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section style={{ margin: "0 2rem" }}>
        <div className="top-title">
          <div className="left-side">
            <div className="question-que">Que :</div>
            <div className="question"> {questionValue}</div>

            <hr />

            <div className="question-que">Answer :</div>
            <div className="question"> {commentValue}</div>

            <hr />

            <div className="question-que">Edited Answer :</div>
            <div className="question"> {renderHighlightedText()}</div>

            <hr />
            <div className="cheack-ans">
              <div className="cheack-ans-button">
                <button
                  className="cheack-ans-button-press cancelbtn"
                  onClick={() => cheackGrant("false", data._id)}
                >
                  Cancel
                </button>
              </div>
              <div className="cheack-ans-button ">
                <button
                  className="cheack-ans-button-press"
                  onClick={() => cheackGrant("true", data._id)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Adminn_Cheack_Ans;

// const avatars = document.querySelectorAll(".avatar");

// avatars.forEach((a) => {
//   const charCodeRed = a.dataset.label.charCodeAt(0);

//   const charCodeGreen = a.dataset.label.charCodeAt(1) || charCodeRed;

//   const red = Math.pow(charCodeRed, 7) % 200;
//   const green = Math.pow(charCodeGreen, 7) % 200;
//   const blue = (red + green) % 200;

//   a.style.background = `rgb(${red}, ${green}, ${blue})`;

// console.log(charCodeRed);
// console.log(charCodeGreen);
// });
