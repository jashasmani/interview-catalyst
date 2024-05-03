import React, { useState, useEffect } from "react";
import "../profile/Profile.css";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditProfile from "../EditProfile/EditProfile";
import axios from "axios";
import AddQuestion from "../../Message/JSX/AllQuestion";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import Search from "../../Search/Search";
import { SearchResultsList } from "../../Search/SearchResultList";
import { Avatar } from "antd";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [questionData, setQuestionData] = useState([]);
  const [results, setResults] = useState([]);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const [cusername, setCUsername] = useState("");
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
        <div className="search-bar-container">
          <Search setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
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
                  <div className={profile.name ? "profile-name1" : ""}>
                    <div className="profile-name">
                      {" "}
                      <h4 className="profileInfoName">{profile.name}</h4>
                    </div>

                    <div className="profInfoDesc">
                      <span className="profileInfoDesc">
                        {profile.college_name ? (
                          <SchoolIcon className="profile-icon" />
                        ) : (
                          ""
                        )}
                        <div>{profile.college_name}</div>
                        {/*  ) : (
                       ""
                       )} */}
                      </span>
                      <span className="profileInfoDesc">
                        {profile.bio ? (
                          <AssessmentIcon className="profile-icon" />
                        ) : (
                          ""
                        )}
                        <div>{profile.bio}</div>
                        {/* ) : (
                        ""
                      )} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {profile.image ? (
                <img
                  className="profileUserImg"
                  src={profile.image}
                  alt="profile"
                />
              ) : (
                // <AccountCircleIcon
                //   style={{ fontSize: "14rem", border: "none" }}
                // />
                ""
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
