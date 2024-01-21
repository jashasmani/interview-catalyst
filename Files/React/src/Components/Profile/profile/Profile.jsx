import React, { useState } from "react";
// import user from "../images/user.png";
// import acc from "../images/acc.png";
import "../profile/Profile.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import EditProfile from "../EditProfile/EditProfile";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  return (
    <>
      <nav className="nav-profile">
        <div className="name-profile">Interview Catalyst</div>

        <div className="search-write">
          <SearchIcon className="image-main" />
          <input
            type="search"
            placeholder="Search Username"
            id="search"
            // onChange={onSearch}
            required
          />
        </div>

        <div className="btn-profile" onClick={openEditModal}>
          <button className="btn-prof">Edit Profile</button>
          {isEditModalOpen && (
            <EditProfile closeModal={() => setEditModalOpen(false)} />
          )}
        </div>
      </nav>

      <div className="container-profile">
        <div className="overlap-profile">
          <div className="user-profile">
            <img
              src="https://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="top-profile">
          <div className="info-profile">
            <h1 className="profile-name">Dhairya Bhatt</h1>
            <div className="web">
              <CodeIcon className="profile-icon" />
              <h4 className="profile-name">Web Developer</h4>
            </div>
            <div className="location">
              <LocationOnIcon className="profile-icon" />
              <h4 className="profile-name">Ahmedabad,Gujarat</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
