import { React, useState, useEffect } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "axios";

const Like = ({ currentValue, cid, countLikeTotal, updateCommentData }) => {
  const [isValueLiked, setIsValueLiked] = useState(false);
  const [calculateLike, setCalculateLike] = useState([]);
  const [cusername, setCUsername] = useState("");
  const [likeCount, setLikeCount] = useState(countLikeTotal);

  useEffect(() => {
    const fetchLikes = async () => {
      const count = () => {
        const likesForQuestion = calculateLike.filter(
          (like) => like.question_id === cid && like.like === true
        );
        const numberOfLikes = likesForQuestion.length;
        return numberOfLikes;
      };
      try {
        const res = await axios.get("https://interview-catalyst.onrender.com/user/likes");
        const likesData = res.data.get_like;
        setCalculateLike(likesData);

        const currentUserLike = likesData.find((like) => {
          if (cid === undefined) {
            return (
              like.question_id === currentValue._id &&
              like.cusername === cusername
            );
          }
          return like.question_id === cid && like.cusername === cusername;
        });
        if (currentUserLike) {
          setIsValueLiked(currentUserLike.like);
          setLikeCount(count());
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [currentValue._id, cusername, cid, likeCount, calculateLike]);

  // ---------------------------------------------------------------------------------------------------
  const change = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://interview-catalyst.onrender.com/user/likes", {
        question_id: cid === undefined ? currentValue._id : cid,
        like: !isValueLiked,
        cusername,
      });

      // setTimeout(() => {
      setIsValueLiked(!isValueLiked);
      // setLikeCount(isValueLiked ? likeCount - 1 : likeCount + 1);
      setLikeCount((prevLikeCount) =>
        isValueLiked
          ? prevLikeCount <= 0
            ? 0
            : prevLikeCount - 1
          : prevLikeCount + 1
      );
      likechange(isValueLiked ? likeCount - 1 : likeCount + 1);
      updateCommentData();
      // }, 2000);
    } catch (error) {
      console.error("Error submitting like:", error);
    }
  };

  const likechange = async (newLikeCount) => {
    try {
      const res = await axios.post("https://interview-catalyst.onrender.com/user/commentsubmit", {
        question_id: cid,
        likeCount: newLikeCount,
      });
      updateCommentData();
      // console.log("12", res.data);
    } catch (error) {
      console.log(error);
    }
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
  return (
    <>
      <div className="likes" onClick={change}>
        {isValueLiked ? (
          <ThumbUpAltIcon style={{ color: "#40A2E3", cursor: "pointer" }} />
        ) : (
          <ThumbUpOffAltIcon style={{ cursor: "pointer" }} />
        )}
        <div className="likecount">{likeCount}</div>
        {/* <div className="likecount">{countLikeTotal}</div> */}
      </div>
    </>
  );
};

export default Like;
