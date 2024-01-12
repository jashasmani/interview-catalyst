import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../CSS/AddQuestion.css";
import "../CSS/AllQuestion.css";
import like from "../Image/like_empty.png";
import likefilled from "../Image/like_filled.png";
import comment from "../Image/comment.png";

function AddQuestion() {
  const [isLiked, setIsLiked] = useState(false);

  function fillLike(e) {
    console.log("img changed");
    if (!isLiked) {
      setIsLiked(true);
      e.target.setAttribute("src", { likefilled });
    }
    if (isLiked) {
      setIsLiked(false);
      e.target.setAttribute("src", { like });
    }

  }

  return (
    <div className="main-addQuestion">
      <div className="top-addQuestion">
        <div className="avatar" data-label="DB"></div>
        <div className="name">Dhairya Bhatt</div>
      </div>
      <div className="question">
        What is middleware in Node.js and how is it used? <hr />
      </div>
      <div className="answer">
        &#8594; In Node.js, middleware is a function that takes in the request
        and response objects, as well as the next middleware function in the
        application's request-response cycle. It can be employed to alter the
        request or response objects, as well as to execute various tasks such as
        logging, authentication, and error handling.
      </div>
      <div className="responses">
        <div className="likes">
          {/* <img src={like} alt=""  onClick={fillLike} /> */}
          <img src={isLiked ? likefilled : like} onClick={fillLike} />
        </div>
        <div className="comments">
          <img src={comment} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;


const avatars = document.querySelectorAll(".avatar");

avatars.forEach(a => {
  const charCodeRed = a.dataset.label.charCodeAt(0);

  const charCodeGreen = a.dataset.label.charCodeAt(1) || charCodeRed;

  const red = Math.pow(charCodeRed, 7) % 200;
  const green = Math.pow(charCodeGreen, 7) % 200;
  const blue = (red + green) % 200;

  // a.style.background = rgb(${ red }, ${ green }, ${ blue });


  console.log(charCodeRed);
  console.log(charCodeGreen);
})