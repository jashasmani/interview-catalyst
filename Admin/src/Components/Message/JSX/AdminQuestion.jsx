import React, { useState, useEffect } from "react";
import "../../Message/CSS/AllQuestion.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comment from "../../Comments/Comment";
import axios from "axios";

function AddQuestion({ currentValue, setShowAlert }) {
  const [profileImage, setProfileImage] = useState("");
  const [grant, setGrant] = useState("false");

  const [, setCurrentTime] = useState(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const [similarQuestions, setSimilarQuestions] = useState([]);

  useEffect(() => {
    const fetchSimilarQuestions = async () => {
      try {
        // Iterate over each similar question ID
        const similarQuestionDetails = await Promise.all(
          currentValue.similar_questions.map(async (similarQuestion) => {
            const response = await axios.get(
              `http://localhost:5000/user/questionbyid?question_id=${similarQuestion._id}`
            );
            console.log(response.data);
            return response.data.question_value.question_html; // Assuming response.data contains question details
          })
        );

        setSimilarQuestions(similarQuestionDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarQuestions();
  }, [currentValue._id, currentValue.similar_questions, grant]);

  // console.log(currentValue.similar_questions);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/user/getprofile?cusername=${currentValue.username}`
  //       );
  //       const newData = res.data.profile;
  //       setProfileImage(newData.image);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [currentValue.username]);

  // const calculateTimeDifference = (timestamp) => {
  //   const timeDifference = new Date() - new Date(timestamp);

  // const minutes = Math.floor(timeDifference / (1000 * 60));
  // const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  // const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  // setMin(minutes);
  // setHours(hours);
  // setDays(days);
  // setYears(years);
  // };

  // useEffect(() => {
  //   calculateTimeDifference(currentValue.timestamp);
  // }, [currentValue.timestamp]);
  // console.log(similarQuestions);
  return (
    <>
      {currentValue.grant === "false" ? (
        <section style={{ margin: "0 2rem" }}>
          <div className="top-title">
            <div className="left-side">
              <div className="question-que">Question :</div>

              <div
                className="question"
                dangerouslySetInnerHTML={{ __html: currentValue.question_html }}
              />
              <div className="question">
                {similarQuestions.length > 0 ? (
                  <>
                    <strong style={{ color: "#FF1E1E" }}>
                      Similar Questions
                      <br />
                    </strong>
                    <br />
                    <hr />
                    <br />
                  </>
                ) : (
                  ""
                )}

                {similarQuestions.map((value, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", color: "#38E54D" }}>
                      <span>
                        {"Q"}
                        {index + 1}
                        {"."}
                      </span>
                      <div dangerouslySetInnerHTML={{ __html: value }} />
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="right-side">
              <div className="favourite-count">
                <MoreVertIcon style={{ fontSize: "2rem" }} />
              </div>
            </div> */}
          </div>

          <div className="main-addQuestion">
            <Comment
              questionId={currentValue._id}
              currentValue={currentValue}
              img={profileImage}
              questionData={currentValue.question}
              setShowAlert={setShowAlert}
              setGrant={setGrant}
            />
          </div>
        </section>
      ) : (
        ""
      )}
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
});
