import React, { useState, useEffect } from "react";
import "../../Message/CSS/AllQuestion.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comment from "../../../Comments/Comment";
import axios from "axios";

function AddQuestion({ currentValue,setShowAlert }) {
  const [profileImage, setProfileImage] = useState("");


  const [, setCurrentTime] = useState(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        await axios.get(
          `https://interview-catalyst.onrender.com/user/getcomment?question_id=${currentValue._id}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnswer();
  }, [currentValue._id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://interview-catalyst.onrender.com/user/getprofile?cusername=${currentValue.username}`
        );
        const newData = res.data.profile;
        setProfileImage(newData.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentValue.username]);



  return (
    <>
      <section style={{ margin: "0 2rem" }}>
        <div className="top-title">
          <div className="left-side">
            <div className="question-que">Que :</div>
           
            <div className="question"> {currentValue.question}</div>
          </div>

          <div className="right-side">
            <div
              className="favourite-count"
              // onClick=''
            >
              <MoreVertIcon style={{ fontSize: "2rem" }} />
            </div>
          </div>
        </div>

        <div className="main-addQuestion">

          <Comment
            questionId={currentValue._id}
            currentValue={currentValue}
            img={profileImage}
            questionData={currentValue.question}
            setShowAlert={setShowAlert}
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
