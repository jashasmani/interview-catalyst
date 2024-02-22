import React, { useState, useEffect } from "react";
import "../profile/Profile.css";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditProfile from "../EditProfile/EditProfile";
import axios from "axios";
import AddQuestion from "../../Message/JSX/AllQuestion";
import backimg from "../profile/plainimage.jpg";
// import Back from '../profile/backimage.png'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [cusername, setCUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [questionData, setQuestionData] = useState([]);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching login...");

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

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...111");

      try {
        const res = await axios.get(
          `http://localhost:5000/user/getprofile?cusername=${cusername}`
        );
        const newData = res.data.profile;
        console.log(newData);
        setProfile(newData);
      } catch (error) {
        //  console.log(error);
      }
    };

    fetchData();
  }, [cusername, isEditModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching question...");

      try {
        const res = await axios.get("http://localhost:5000/user/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newData = res.data.question;
        setQuestionData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="nav-profile">
        <div className="name-profile">Interview Catalyst</div>

        <div className="search-write">
          <SearchIcon className="image-main" />
          <input
            type="search"
            placeholder="Search Username"
            id="searchprofile"
            // onChange={onSearch}
            required
          />
        </div>

        <div className="btn-profile" onClick={openEditModal}>
          <button className="btn-prof">Edit Profile</button>
        </div>
      </nav>
      <div className="profile-all">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img className="profileCoverImg" src={backimg} alt="back" /> */}
              <div className="profileCoverImg">
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {/* {profile.name} */}
                    Dhairya Bhatt
                  </h4>

                  <div className="profInfoDesc">
                  <span className="profileInfoDesc">
                    {profile.college_name !== "" ? (
                      <div>
                        <SchoolIcon className="profile-icon" />
                        {/* {profile.college_name} */}
                        DDU
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="profileInfoDesc">
                    {profile.bio !== "" ? (
                      <div>
                        <AssessmentIcon className="profile-icon" />
                        {/* {profile.bio} */}
                        Web Developer
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  </div>
                 
                </div>
              </div>

              {profile.image !== "" ? (
                <img
                  className="profileUserImg"
                  src={profile.image}
                  alt="profile"
                />
              ) : (
                <AccountCircleIcon
                  className="profileUserImg"
                  style={{ fontSize: "14rem", border: "none" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="question-bar-profile">
          {questionData.map((value, index) =>
            value.username === cusername ? (
              <AddQuestion key={index} currentValue={value} />
            ) : (
              <div></div>
            )
          )}
        </div>
        {isEditModalOpen && (
          <EditProfile
            closeModal={() => setEditModalOpen(false)}
            cusername={cusername}
            profile={profile}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
