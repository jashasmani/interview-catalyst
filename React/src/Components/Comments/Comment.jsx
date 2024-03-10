import axios from "axios";
import { React, useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Like from "./Like";
import EditAnswer from "./EditAnswer";
import Answerdata from "./Answerdata";
// import Dropdown from "./Dropdown";
import Default from "./one";
// import SideAvtar from "../SideAvtar/SideAvtar";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const Comment = ({
  questionId,
  currentValue,
  img,
  questionData,
  setShowAlert,
}) => {
  const [commentData, setCommentData] = useState("");
  const [nextCommentData, setNextCommentData] = useState([]);
  const [addcommentData, setAddCommentData] = useState(false);
  const [cusername, setCUsername] = useState(false);
  const [getCommentusername, setGetCommentUsername] = useState([]);
  const [firstComment1, setFirstComment] = useState([]);
  const [restComment1, setRestComment] = useState([]);
  const [isEditAnsModalOpen, setEditAnsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  // useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/getcomment?question_id=${questionId}`
      );
      const sortData = res.data.question_comment;

      const sortedComments = sortData.sort((a, b) => b.likeCount - a.likeCount);
      // console.log(sortedComments);
      setFirstComment(sortedComments.length > 0 ? sortedComments[0] : null);
      setRestComment(sortedComments.slice(1));

      const usernames = res.data.question_comment.map(
        (comment) => comment.username
      );
      // setProfileImage(usernames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = () => {
    setAddCommentData(!addcommentData);
  };

  const handleCommentData = (e) => {
    e.preventDefault();
    setCommentData(e.target.value);
    resizeTextarea();
  };

  const change = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/commentsubmit", {
        cusername: cusername,
        question_id: currentValue._id,
        commentData,
        edited_comment: "none",
      });
      console.log(res.data);
      setNextCommentData(res.data.question_comment);
      setCommentData("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (e) => {
    change();
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching login...");

      try {
        const res = await axios.get("http://localhost:5000/user/login", {
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

    function resizeTextarea() {
      const textarea = document.getElementById("input-comment");
      textarea.style.height = "1rem";
      textarea.style.height = textarea.scrollHeight + "px";
    }

  // const setProfileImage = async (usernames) => {
  //   try {
  //     const profiles = [];
  //     for (const username of usernames) {
  //       const res = await axios.get(
  //         `http://localhost:5000/user/getprofile?cusername=${username}`
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

  const openEditAnsModal = (commentId) => {
    // console.log("BorderColorIcon. :", commentId);
    // console.log("First comment:", firstComment1._id);
    setSelectedCommentId(commentId);
    setEditAnsModalOpen(true);
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
                  onClick={() => openEditAnsModal(firstComment1._id)}
                >
                  <BorderColorIcon
                    style={{ marginRight: "0rem", cursor: "pointer" }}
                  />
                </div>
              </div>
              {isEditAnsModalOpen && (
                <EditAnswer
                  closeModal={() => {
                    setSelectedCommentId(null);
                    setEditAnsModalOpen(false);
                  }}
                  questionData={questionData}
                  cid={selectedCommentId}
                  setShowAlert={setShowAlert}
                />
              )}

              <Answerdata comment={firstComment1} />
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
        <div className="main-comment">
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
                        onClick={() => openEditAnsModal(comment._id)}
                      >
                        <BorderColorIcon
                          style={{ marginRight: "0rem", cursor: "pointer" }}
                        />
                      </div>
                    </div>

                    <Answerdata comment={comment} />
                    {isEditAnsModalOpen && (
                      <EditAnswer
                        closeModal={() => {
                          setSelectedCommentId(null);
                          setEditAnsModalOpen(false);
                        }}
                        questionData={questionData}
                        cid={selectedCommentId}
                        setShowAlert={setShowAlert}
                      />
                    )}

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
          <hr style={{ height: "1px", margin: "0 1rem" }} />
          <label className="comment-title">Add Yours</label>
          <div className="main-comment-in">
            <div className="comments-send">
              <textarea
                className="input-comment"
                id="input-comment"
                type="text"
                value={commentData}
                onChange={handleCommentData}
                placeholder="Add here.."
                wrap="soft"
              />
              <div className="button-comment-div">
                <div className="button-comment" onClick={handleSubmitComment}>
                  <SendIcon />
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Comment;
