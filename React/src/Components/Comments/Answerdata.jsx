import { React, useState, useEffect } from "react";
import axios from "axios";

const Answer = ({ comment }) => {
  const [displayedText, setDisplayedText] = useState(comment.comment);
  const [checkGrant, setCheckGrant] = useState("");

  const [username, setUsername] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/geteditedanswerbyid?comment_id=${comment._id}`
        );

        const data1 = res.data.editcomment_data;
        setCheckGrant(data1.grant);
        setUsername(data1.cusername);

        console.log(comment.edited_comment);
        // Function to split sentences properly
        const splitSentences = (text) => {
          return text
            .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
            .split("|")
            .map((sentence) => sentence.trim());
        };

        const sentences1 = splitSentences(comment.comment);
        const sentences2 = splitSentences(comment.edited_comment);

        const highlightedSentences = sentences2.map((sentence, index) => {
          const words1 = sentences1[index]
            ? sentences1[index].split(/\s+/)
            : [];
          const words2 = sentence.split(/\s+/);

          const highlightedWords = words2.map((word, index) => {
            if (!words1.includes(word)) {
              return (
                <span key={index} className="highlighted-word">
                  {word}
                  <span>{"  "}</span>
                </span>
              );
            }
            return <span key={index}> {word} </span>;
          });

          return <span key={index}>{highlightedWords}</span>;
        });

        setHighlightedText(highlightedSentences);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [comment._id, comment.comment, comment.edited_comment]);


  const handleMouseEnter = () => {
    
      setDisplayedText(true);
    
  };

  const handleMouseLeave = () => {
    setDisplayedText(false);
  };
  return (
    <>
      <div className="answer">
        <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {checkGrant === "setTrue" ? (
            <div>
              {highlightedText.map((sentence, index) => (
                <p key={index}>
                  {sentence}
                  <span>{"  "}</span>
                </p>
              ))}
              {/* {comment.edited_comment} */}
            </div>
          ) : (
            <p>{comment.comment}</p>
          )}
        </p>
      </div>
    </>
  );
};

export default Answer;
