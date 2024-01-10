import React from "react";
import { Link } from "react-router-dom";
import './CSS/Message.css';
// import { Avatar } from "@mui/material/Avatar";
import AllQuestion from "./AllQuestion";

function Msg() {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/ask-question">
            {/* Provide the correct path to the Ask Question page */}
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <p>All questions stat</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link to="/latest">Latest</Link>
              </div>
              <div className="main-tab">
                <Link to="/active">Active</Link>
              </div>
              <div className="main-tab">
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="questions">
              <div className="question">
                <AllQuestion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Msg;