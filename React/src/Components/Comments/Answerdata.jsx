import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { diffChars } from "diff";

const Answer = ({ comment }) => {
  const [checkGrant, setCheckGrant] = useState("");
  const [data, setData] = useState("");
  const [editedName, setEditedName] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      console.log(data);
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/getname/${data}`
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
          `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${comment._id}`
        );

        const data1 = res.data.editcomment_data;
        setCheckGrant(data1.grant);

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
  }, [comment._id, comment.comment, comment.edited_comment]);

  function compareParagraphs(paragraph1, paragraph2) {
    const diff = diffChars(paragraph1, paragraph2);
    return diff.map((part, index) => {
      const style = {
        // backgroundColor: part.added ? "#aaffaa" : "transparent",
        // color: part.added ? "green" : "inherit",
      };
      return (
        <span
          key={index}
          style={style}
          className={part.added ? "highlighted-word" : ""}
          onMouseEnter={() => setData(part.value)}
          onMouseLeave={() => setData("")}
        >
          <Tooltip title={editedName} arrow>
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
            <div>{comment.comment}</div>
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
