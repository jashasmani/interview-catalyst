import axios from "axios";
import { React, useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Comment = ({ currentValue }) => {
  const [commentData, setCommentData] = useState("");
  const [nextCommentData, setNextCommentData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [addcomment, setAddComment] = useState(false);
  const [cusername, setCUsername] = useState(false);

  const fillLike = (e) => {
    if (!isLiked) {
      setIsLiked(true);
      change();
    }
    if (isLiked) {
      setIsLiked(false);
      change();
    }
  };

  const showData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/user/getcomment?question_id=${currentValue._id}`
      );
      console.log(res.data);
      setNextCommentData(res.data.question_comment);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!addcomment) {
      showData();
      setAddComment(true);
    }
    if (addcomment) {
      setAddComment(false);
    }
  };

  const handleCommentData = (e) => {
    e.preventDefault();
    setCommentData(e.target.value);
  };

  const change = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/commentsubmit", {
        cusername: cusername,
        question_id: currentValue._id,
        commentData,
        like: isLiked,
      });
      setNextCommentData(res.data.question_comment);
      setCommentData('')
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (e) => {
    change();
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching login...");

      try {
        const res = await axios.get("http://localhost:8080/user/login", {
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
  }, [addcomment]);

  return (
    <>
      <div className="responses">
        <div className="icon-left">
          <div className="likes" onClick={fillLike}>
            {isLiked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
          <div className="comments" onClick={addComment}>
            <CommentIcon />
          </div>
        </div>
      </div>
      <hr style={{ height: "1px" }} />

      {addcomment ? (
        <div className="main-comment">
          <label className="comment-title">Comments</label>
          <div className="main-comment-in">
            <div className="comments-send">
              <textarea
                className="input-comment"
                type="text"
                value={commentData}
                onChange={handleCommentData}
                placeholder="Add Your Comment.."
              />
              <div className="button-comment-div">
                <button
                  className="button-comment"
                  onClick={handleSubmitComment}
                >
                  <SendIcon />
                </button>
              </div>
            </div>
            <hr />
            <div className="comment-botttom-list">
              {nextCommentData.map((comment, index) => (
                <div key={index}>
                  <div className="comment-3">
                    <div className="comment-userimage">
                      <AccountCircleIcon style={{ fontSize: "2.5rem" }} />
                    </div>
                    <div className="comment-comment-2">
                      <div className="comment-time">
                        <div className="comment-username">
                          {comment.username}
                        </div>
                        <div className="comment-username-time">2 min ago</div>
                      </div>
                      <div className="comment-subcomment">
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Comment;
