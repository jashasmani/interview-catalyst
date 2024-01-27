import React, { useState, useEffect } from "react";
import "../profile/Profile.css";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditProfile from "../EditProfile/EditProfile";
import axios from "axios";
import AddQuestion from "../../Message/JSX/AllQuestion";
import Back from "./back-image.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...111");

      try {
        const res = await axios.get(`http://localhost:8080/user/getprofile?cusername=${cusername}`);
        const newData = res.data.profile;
        console.log(newData)
        setProfile(newData);
      } catch (error) {
        //  console.log(error);
      }
    };

    
    fetchData();
  }, [cusername,isEditModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching question...");

      try {
        const res = await axios.get("http://localhost:8080/user/question", {
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
      <section className="profile-all">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={Back} alt="back" />
              
              {profile.image!=null ? (
                <img
                className="profileUserImg"
                src={profile.image}
                alt="profile"
              />
              ) : (
                <AccountCircleIcon className="profileUserImg" style={{fontSize:'14rem'}}/>
              )}
              <div className="profileInfo">
                <h4 className="profileInfoName"> {profile.name}</h4>
                <span className="profileInfoDesc">
                  <SchoolIcon className="profile-icon" />
                  {profile.college_name}
                </span>
                <span className="profileInfoDesc">
                  <AssessmentIcon className="profile-icon" />
                  {profile.bio}
                </span>
              </div>
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
          />
        )}
      </section>
    </>
  );
};

export default Profile;
