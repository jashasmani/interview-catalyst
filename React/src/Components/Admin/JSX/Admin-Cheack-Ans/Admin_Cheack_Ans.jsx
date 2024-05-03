import React, { useState, useEffect } from "react";
import "../../CSS/Admin_cheack_Ans.css";
import "../../../Message/CSS/AllQuestion.css";
import { diffChars } from "diff";
import axios from "axios";
import { diffWords, diffSentences } from "diff";

function Adminn_Cheack_Ans({ data, setRefereshData }) {
  const [questionValue, setQuestionValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [outputData, setOutputData] = useState("");

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
          `https://interview-catalyst.onrender.com/user/getcommentbyid?comment_id=${data.comment_id}`
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
        outputData: outputData,
      });
      setRefereshData(true);
      // console.log("123456")
    } catch (error) {
      console.log(error);
    }
  };

  function compareParagraphs(paragraph1, paragraph2) {
    const diff = diffWords(paragraph1, paragraph2);

    let output = "";
    let newOutputData = ""; // Define a variable to store the updated output data
    diff.forEach((part) => {
      if (part.added || part.removed) {
        const style = {
          backgroundColor: part.added ? "#aaffaa" : "transparent",
          color: part.added ? "green" : "inherit",
        };
        if (part.added) {
          output += `<span style="background-color: ${style.backgroundColor}; color: ${style.color};">${part.value}</span>`;
          newOutputData += part.value; // Append the added part to the new output data
        }
      } else {
        output += part.value;
      }
    });

    // Update the state only if new output data is different from the current output data
    if (newOutputData !== outputData) {
      setOutputData(newOutputData);
    }

    return <div dangerouslySetInnerHTML={{ __html: output }} />;
  }

  function compareParagraphsMain(paragraph1, paragraph2) {
    const diff = diffWords(paragraph1, paragraph2);
    let output = "";

    diff.forEach((part) => {
      if (part.removed) {
        const style = {
          backgroundColor: "#ffaaaa",
          textDecoration: "line-through",
          color: "#ff0000",
        };
        output += `<span style="background-color: ${style.backgroundColor}; text-decoration: ${style.textDecoration}; color: ${style.color};">${part.value}</span>`;
      } else if (part.added) {
        const style = {
          backgroundColor: "#aaffaa",
          color: "green",
        };
        // output += `<span style="background-color: ${style.backgroundColor}; color: ${style.color};">${part.value}</span>`;
      } else {
        output += part.value; // Append remaining words from paragraph1
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: output }} />;
  }

  return (
    <>
      <section style={{ margin: "0 2rem" }}>
        <div className="top-title">
          <div className="left-side">
            <div className="question-que">Que :</div>
            <div className="question"> {questionValue}</div>

            <hr />

            <div className="question-que">Answer :</div>
            <div className="question">
              {" "}
              {/* {sentenceHighlighted} */}
              {compareParagraphsMain(commentValue, data.edit_answer)}
            </div>

            <hr />

            <div className="question-que">Edited Answer :</div>
            <div className="question">
              {" "}
              {compareParagraphs(commentValue, data.edit_answer)}
            </div>

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
