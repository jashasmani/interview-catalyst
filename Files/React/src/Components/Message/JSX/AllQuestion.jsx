import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../CSS/AddQuestion.css";
import "../CSS/AllQuestion.css";
import like from "../Image/like_empty.png";
import likefilled from "../Image/like_filled.png";
import comment from "../Image/comment.png";


function AddQuestion({ currentValue }) {


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
    <>

      <div className="top-title">

        <div className="left-side">
          <div className="avatar" data-label="UN"></div>
          <div className="name">
            User Name
            <div className="time-title"><i class="fa-regular fa-clock"></i> 3 min ago</div>
          </div>
        </div>

        <div className="right-side">
          <div className="answer-title"><div className="answer-count">35</div> Answer</div>
          <div className="votes-title"><div className="votes-count">21</div>Votes</div>
          <div className="favourite-title"><div className="favourite-count">89</div>Favourite</div>
        </div>

      </div>


      <div className="main-addQuestion">
        <div className="question">
          {currentValue.question}
          
          
        </div>
          <hr className="question-hr"/>
        <div className="answer">
          {/* &#8594; */}
          {currentValue.answer}
        </div>
        <div className="responses">
          <div className="likes">
            {/* <img src={like} alt=""  onClick={fillLike} /> */}
            <img src={isLiked ? likefilled : like}
              onClick={fillLike}
              alt="" />
          </div>
          <div className="comments">
            <img src={comment} alt="" />
          </div>
        </div>
      </div>
    </>
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

  a.style.background = `rgb(${red}, ${green}, ${blue})`;


  // console.log(charCodeRed);
  // console.log(charCodeGreen);
})