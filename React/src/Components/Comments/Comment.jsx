import axios from "axios";
import { React, useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import Like from "./Like";
import Answerdata from "./Answerdata";
import Default from "./Contribution";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import Input from "../Write/Input";
import InputEdit from "../Write/InputEdit";

const Comment = ({
  questionId,
  currentValue,
  img,
  questionData,
  setShowAlert,
}) => {
  const [commentData, setCommentData] = useState(true);
  const [editAns, setEditAns] = useState(true);
  const [nextCommentData, setNextCommentData] = useState([]);
  const [addcommentData, setAddCommentData] = useState(false);
  const [cusername, setCUsername] = useState(false);
  const [getCommentusername, setGetCommentUsername] = useState([]);
  const [firstComment1, setFirstComment] = useState([]);
  const [restComment1, setRestComment] = useState([]);
  const [isEditAnsModalOpen, setEditAnsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [open, setOpen] = useState(false);

 

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://interview-catalyst.onrender.com/user/getcomment?question_id=${questionId}`
      );
      const sortData = res.data.question_comment;

      const sortedComments = sortData.sort((a, b) => b.likeCount - a.likeCount);
      // console.log(sortedComments);
      setFirstComment(sortedComments.length > 0 ? sortedComments[0] : null);
      setRestComment(sortedComments.slice(1));

      // const usernames = res.data.question_comment.map(
      //   (comment) => comment.username
      // );
      // setProfileImage(usernames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [open]);

  const addComment = () => {
    setAddCommentData(!addcommentData);
  };

  // const handleCommentData = (e) => {
  //   e.preventDefault();
  //   setCommentData(e.target.value);
  // };

  // const change = async () => {
  //   try {
  //     const res = await axios.post("https://interview-catalyst.onrender.com/user/commentsubmit", {
  //       cusername: cusername,
  //       question_id: currentValue._id,
  //       commentData,
  //       edited_comment: "none",
  //     });
  //     console.log(res.data);
  //     setNextCommentData(res.data.question_comment);
  //     setCommentData("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmitComment = async (e) => {
    setCommentData(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://interview-catalyst.onrender.com/user/login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCUsername(res.data.cusername);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const setProfileImage = async (usernames) => {
  //   try {
  //     const profiles = [];
  //     for (const username of usernames) {
  //       const res = await axios.get(
  //         `https://interview-catalyst.onrender.com/user/getprofile?cusername=${username}`
  //       );
  //       const newData = res.data.profile;
  //       profiles.push(newData);
  //     }
  //     // console.log(profiles);
  //     setGetCommentUsername(profiles);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const calculateTimeDifference = (timestamp) => {
    const timeDifference = new Date() - new Date(timestamp);
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) return `${years} years ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} min ago`;
    return "Just now";
  };

  const showModal = (comment) => {
    setSelectedCommentId(comment);
    setOpen(true);
  };

  const handleCancel = () => {
    setSelectedCommentId(null);
    setOpen(false);
  };

  const avatarGroupStyle = {
    display: "flex",
    marginRight: "6rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  };

  return (
    <>
      <div className="comment-3">
        <div className="comment-comment-2">
          <div className="comment-comment-top">
            <div className="manage-space">
              <div className="contro-distance">
                <div className="contro-distance2">
                  <div className="comment-userimage">
                    <div className="avatar">
                      {getCommentusername[0] &&
                      getCommentusername[0].image !== null ? (
                        <img src={getCommentusername[0].image} alt="profile" />
                      ) : (
                        <AccountCircleIcon style={{ fontSize: "3rem" }} />
                      )}
                    </div>
                  </div>
                  <div className="comment-time">
                    <div className="comment-username">
                      {firstComment1.username}
                    </div>

                    <div className="time-title">
                      <QueryBuilderIcon
                        style={{ fontSize: "0.7rem", marginRight: "5px" }}
                      />
                      <div className="comment-username-time">
                        {calculateTimeDifference(firstComment1.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contro-name">
                  <FluentProvider
                    theme={webLightTheme}
                    style={avatarGroupStyle}
                  >
                    <Default cid={firstComment1._id} />
                  </FluentProvider>
                </div>
              </div>

              <div className="question-que" style={{ marginLeft: "1rem" }}>
                <p> Ans :</p>
                <div
                  className="comments"
                  onClick={() => {
                    setEditAns(true);
                    // openEditAnsModal(firstComment1._id);
                  }}
                >
                  <span onClick={() => showModal(firstComment1._id)}>
                    <BorderColorIcon
                      style={{ marginRight: "0rem", cursor: "pointer" }}
                    />
                  </span>
                  {open && (
                    <InputEdit
                      open={true}
                      handleCancel={() => setOpen(false)}
                      username={cusername}
                      questionData={questionData}
                      cid={firstComment1._id}
                      editAns={editAns}
                      questionId={questionId}
                    />
                  )}
                </div>
              </div>

              <Answerdata comment={firstComment1} setShowAlert={setShowAlert} />
            </div>
            <div className="responses">
              <div className="icon-left">
                <Like
                  currentValue={currentValue}
                  nextCommentData={nextCommentData}
                  cid={firstComment1._id}
                  countLikeTotal={firstComment1.likeCount}
                  updateCommentData={() => {
                    fetchComments();
                  }}
                />
                <div className="comments" onClick={addComment}>
                  <KeyboardArrowDownIcon style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {addcommentData ? (
        <>
          <div className="comment-botttom-list">
            {restComment1.map((comment, index) => (
              <div key={index}>
                <hr style={{ height: "1px", margin: "0 1rem" }} />
                <div className="comment-3">
                  <div className="comment-comment-2">
                    <div className="comment-comment-top">
                      <div className="contro-distance">
                        <div className="contro-distance2">
                          <div className="comment-userimage">
                            <div className="avatar">
                              {getCommentusername[index + 1] &&
                              getCommentusername[index + 1].image !== null ? (
                                <img
                                  src={getCommentusername[index + 1].image}
                                  alt="profile"
                                />
                              ) : (
                                <AccountCircleIcon
                                  style={{ fontSize: "3rem" }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="comment-time">
                            <div className="comment-username">
                              {comment.username}
                            </div>
                            <div className="time-title">
                              <QueryBuilderIcon
                                style={{
                                  fontSize: "0.7rem",
                                  marginRight: "5px",
                                }}
                              />
                              <div className="comment-username-time">
                                {calculateTimeDifference(
                                  firstComment1.timestamp
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="contro-name">
                          <FluentProvider
                            theme={webLightTheme}
                            style={avatarGroupStyle}
                          >
                            <Default firstComment1={comment._id} />
                          </FluentProvider>
                        </div>
                      </div>
                    </div>

                    <div
                      className="question-que"
                      style={{ marginLeft: "1rem" }}
                    >
                      <p> Ans :</p>
                      <div
                        className="comments"
                        onClick={() => {
                          setEditAns(true);
                          // openEditAnsModal(firstComment1._id);
                        }}
                      >
                        <span onClick={() => showModal(firstComment1._id)}>
                          <BorderColorIcon
                            style={{ marginRight: "0rem", cursor: "pointer" }}
                          />
                        </span>
                        {open && (
                          <InputEdit
                            open={true}
                            handleCancel={() => setOpen(false)}
                            username={cusername}
                            questionData={questionData}
                            cid={firstComment1._id}
                            editAns={editAns}
                            questionId={questionId}
                          />
                        )}
                      </div>
                    </div>

                    <Answerdata comment={comment} />
                    {/* {isEditAnsModalOpen && (
                      <EditAnswer
                        closeModal={() => {
                          setSelectedCommentId(null);
                          setEditAnsModalOpen(false);
                        }}
                        questionData={questionData}
                        cid={selectedCommentId}
                        setShowAlert={setShowAlert}
                      />
                    )} */}

                    <div className="responses">
                      <div className="icon-left">
                        <Like
                          currentValue={currentValue}
                          nextCommentData={nextCommentData}
                          cid={comment._id}
                          countLikeTotal={comment.likeCount}
                          updateCommentData={() => {
                            fetchComments();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="comments-send" onClick={handleSubmitComment}>
            <div
              className="input-comment"
              // onChange={handleCommentData}
            >
              <label className="comment-title">Add Yours Comment</label>
              <div className="button-comment-div">
                <div className="button-comment">
                  <Input
                    username={cusername}
                    comment={commentData}
                    questionId={questionId}
                    questionData={questionData}
                    cid={selectedCommentId}
                    // setShowAlert={setShowAlert}
                    // setShowAlert1 setShowAlertCategory
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Comment;
