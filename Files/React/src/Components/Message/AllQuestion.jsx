import React from "react";
import { Link } from "react-router-dom";
// import {Avatar} from "@mui/material";
import './CSS/AllQuestion.css'

function AllQuestion() {
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
           <div className="author">
            <small>Timestamp</small>
            <div className="author-details">
                {/* <Avatar /> */}
                <p>Username</p>
            </div>
           </div>
          

        </div>
        <div className="question-answer">
          <Link>This is question Title</Link>
          <div style={{
            width:"90%"
          }}>
          <div>This is Answer</div>
          </div>
        </div>
        <div className="all-questions-right">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Likes</span>
            </div>
            <div className="all-option">
              <p>0</p>
              <span>DisLikes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestion;