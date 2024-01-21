import React from "react";
import "../CSS/Admin_Question.css";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import VerifiedIcon from "@mui/icons-material/Verified";

function Admin_Question({ currentValue }) {
  const currentTime = Date.now();

  return (
    <>
      <div className="top-title">
        <div className="left-side">
          <div className="avatar" data-label="UN"></div>
          <div className="name">
            {currentValue.username}
            <div className="time-title">
              <QueryBuilderIcon style={{ fontSize: "12px" }} />2 min
            </div>
          </div>
        </div>
      </div>

      <div className="main-addQuestion">
        <div className="verified">
          Verified{" "}
          <VerifiedIcon
            style={{ fontSize: "0.9rem", color: "rgb(17, 255, 4)" }}
          />
        </div>
        <div className="question">{currentValue.question}</div>
        <hr className="question-hr" />
        <div className="answer">{currentValue.answer}</div>
      </div>

      <div>
        <button className="admin-okay">Pass</button>
        <button className="admin-reject">Reject</button>
      </div>
    </>
  );
}

export default Admin_Question;

const avatars = document.querySelectorAll(".avatar");

avatars.forEach((a) => {
  const charCodeRed = a.dataset.label.charCodeAt(0);

  const charCodeGreen = a.dataset.label.charCodeAt(1) || charCodeRed;

  const red = Math.pow(charCodeRed, 7) % 200;
  const green = Math.pow(charCodeGreen, 7) % 200;
  const blue = (red + green) % 200;

  a.style.background = `rgb(${red}, ${green}, ${blue})`;
});
