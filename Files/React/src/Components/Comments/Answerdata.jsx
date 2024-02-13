import { React, useState, useEffect } from "react";
import axios from "axios";

const Answer = ({ comment }) => {
  const [checkGrant, setCheckGrant] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${comment._id}`
        );

        const data1 = res.data.editcomment_data;
        setCheckGrant(data1.grant);

        const sentences1 = comment.comment.split(/\.|\?|\!/);
        const sentences2 = data1.edit_answer.split(/\.|\?|\!/);

        const highlightedSentences = sentences2.map((sentence, index) => {
          const words1 = sentences1[index]
            ? sentences1[index].split(/\s+/)
            : [];
          const words2 = sentence.split(/\s+/);

          const highlightedWords = words2.map((word, index) => {
            if (!words1.includes(word)) {
              return (
                <span
                  key={index}
                  style={{ color: "green", whiteSpace: "pre-line" }}
                >
                  {word + " "}
                </span>
              );
            }
            return <span key={index}> {word} </span>;
          });

          return <p key={index}>{highlightedWords}</p>;
        });

        setHighlightedText(highlightedSentences);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [comment._id, comment.comment]);

  return (
    <>
      <div className="answer">
        {checkGrant === "true"
          ? highlightedText
          // : comment.edited_comment === "none"
          // ? 
          :comment.comment
          // : comment.edited_comment
          }
      </div>
    </>
  );
};

export default Answer;