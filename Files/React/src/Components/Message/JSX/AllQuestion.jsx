import React, { useState, useEffect } from "react";
import "../../Message/CSS/AllQuestion.css";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import Comment from "../../Comments/Comment";
import axios from "axios";

function AddQuestion({ currentValue }) {
  
  const [profileImage, setProfileImage] = useState("");

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  
  const [min, setMin] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [years, setYears] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/user/getprofile?cusername=${currentValue.username}`
        );
        const newData = res.data.profile;
        setProfileImage(newData.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentValue.username]);

  const calculateTimeDifference = (timestamp) => {
    const timeDifference = new Date() - new Date(timestamp);

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    setMin(minutes);
    setHours(hours);
    setDays(days);
    setYears(years);
  };

  useEffect(() => {
    calculateTimeDifference(currentValue.timestamp);
  }, [currentValue.timestamp]);

  return (
    <>
      <section style={{ margin: "0 2rem" }}>
        <div className="top-title">
          <div className="left-side">
            <div
              className="avatar"
              // data-label="UN"
            >
              {profileImage ? (
                <img
                  // className="profileUserImg"
                  src={profileImage}
                  alt="profile"
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "3rem" }} />
              )}
            </div>
            <div className="name">
              <div className="name-title-question">{currentValue.username}</div>
              <div className="time-title">
                <QueryBuilderIcon
                  style={{ fontSize: "0.7rem", marginRight: "5px" }}
                />

                {min > 60
                  ? hours > 24
                    ? years > 365
                      ? `${days} years ago`
                      : `${days} day ago`
                    : `${hours} hours ago`
                  : `${min} min ago`}
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="answer-title">
              <div className="answer-count">35</div> Answer
            </div>
            {/* <div className="votes-title">
              <div className="votes-count">21</div>Votes
            </div> */}
            <div className="favourite-title">
              <div className="favourite-count">89</div>Favourite
            </div>
            <div className="favourite-title">
              <div className="favourite-count" onClick=''><MoreVertIcon style={{fontSize:'2rem'}}/></div>
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
          <div className="answer">
            {/* &#8594; */}
            {currentValue.answer}
          </div>

         

          <Comment
            // addcomment={addcomment}
            // isDown={isDown}
            currentValue={currentValue}
          />
        </div>
      </section>
    </>
  );
}

export default AddQuestion;

const avatars = document.querySelectorAll(".avatar");

avatars.forEach((a) => {
  const charCodeRed = a.dataset.label.charCodeAt(0);

  const charCodeGreen = a.dataset.label.charCodeAt(1) || charCodeRed;

  const red = Math.pow(charCodeRed, 7) % 200;
  const green = Math.pow(charCodeGreen, 7) % 200;
  const blue = (red + green) % 200;

  a.style.background = `rgb(${red}, ${green}, ${blue})`;

  // console.log(charCodeRed);
  // console.log(charCodeGreen);
});
