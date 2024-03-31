import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { diffChars, diffWords } from "diff";

const Answer = ({ comment }) => {
  const [checkGrant, setCheckGrant] = useState("");
  const [data, setData] = useState("");
  const [editedName, setEditedName] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log(data);
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/admin/getname/${data}`
        );

        setEditedName(res.data.name);
        // const data = ;
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [data]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/admin/geteditedanswerbyid?comment_id=${comment._id}`
        );

        const data1 = res.data.editcomment_data;
        setCheckGrant(data1.grant);
        setParagraph1(comment.comment);
        setParagraph2(comment.edited_comment);
        const highlighted = compareParagraphs(
          comment.comment,
          comment.edited_comment
        );

        setHighlightedText(highlighted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [comment._id, comment.comment, comment.edited_comment, data, editedName]);

  function compareParagraphs(paragraph1, paragraph2) {
    const diff = diffWords(paragraph1, paragraph2);
    return diff.map((part, index) => {
      return (
        <span
          key={index}
          className={part.added ? "highlighted-word" : ""}
          onMouseEnter={() => setData(part.value)}
          onMouseLeave={() => setData("")}
        >
          <Tooltip title={part.added ? editedName : ""} arrow>
            {part.value}
          </Tooltip>
        </span>
      );
    });
  }

  return (
    <>
      <div className="answer" style={{ whiteSpace: "pre-line" }}>
        <p>
          {comment.edited_comment === "none" ? (
            <div dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
          ) : checkGrant !== "true" ? (
            <>
              <div>{highlightedText}</div>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
};

export default Answer;
