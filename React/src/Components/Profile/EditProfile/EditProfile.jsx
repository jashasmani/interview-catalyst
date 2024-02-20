import React, { useState, useRef, useEffect } from "react";
import "./EditProfile.css";
import axios from "axios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const EditProfile = ({ closeModal, cusername, profile }) => {
  const [name, setName] = useState(profile.name);
  const [collegename, setCollegeName] = useState(profile.college_name);
  const [bio, setBio] = useState(profile.bio);
  const [image, setImage] = useState(profile.image);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  function capitalizeWords(inputString) {
    return inputString.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const handleNameChange = (e) => {
    setName(capitalizeWords(e.target.value));
  };
  const handleCollegeNameChange = (e) => {
    setCollegeName(capitalizeWords(e.target.value));
  };

  const handleBioChange = (e) => {
    setBio(capitalizeFirstLetter(e.target.value));
  };

  const sendProfile = async () => {
    // if (image) {
    try {
      const res = await axios.post("http://localhost:5000/user/profile", {
        cusername,
        name,
        collegename,
        bio,
        image,
      });
      console.log(res);
      closeModal();
    } catch (e) {
      console.log("error", e);
    }
    // }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const convertToBase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImage(base64);
  };

  const handleImageClick = (e) => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="modal-wrapper2" onClick={closeModal}>
        {" "}
      </div>
      <div className="edit-container" ref={modalRef}>
        <div className="edit-top">
          <h2 className="edit-color">PROFILE INFORMATION</h2>
        </div>
        <div className="edit-bottom">
          <div className="prof-pic">
            <h3 className="edit-color">Profile Photo</h3>
          </div>
          <div className="container-mng">
            <div className="profile-pic">
              {image !== "" ? (
                <img src={image} alt="Profile" style={{width:'7rem',height:'7rem'}}/>
              ) : (
                <AccountCircleIcon style={{ fontSize: "10rem" }} />
              )}

              <div className="btn-row" onClick={handleImageClick}>
                <button className="btn-up">Change</button>

                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="edit-info-upper">
              <div className="edit-name">
                <h4 className="edit-color-name">Name </h4>
                <input
                  className="edit-input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />

                <div className="text">
                  <h5 className="edit-color-text">
                    Appears on your Profile Page.
                  </h5>
                  <div className="input-char-name">{name.length}/50</div>
                </div>
              </div>
              <div className="edit-name">
                <h4 className="edit-color-name">College Name </h4>
                <input
                  className="edit-input"
                  type="text"
                  name="name"
                  placeholder="College Name"
                  value={collegename}
                  onChange={handleCollegeNameChange}
                  required
                />

                <div className="text">
                  <h5 className="edit-color-text">
                    Appears on your Profile Page.
                  </h5>
                  <div className="input-char-name">{collegename.length}/50</div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-info">
            <div className="edit-name">
              <h4 className="edit-color-name">Bio</h4>
              <textarea
                className="edit-textarea"
                placeholder="Put your bio...."
                type="text"
                name="bio"
                required
                value={bio}
                onChange={handleBioChange}
              />
              <div className="text">
                <h5 className="edit-color-text">
                  Appears on your Profile Page and next to your stories.
                </h5>
                <div className="input-char-bio">{bio.length}/100</div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="final-edit">
            <button className="save" onClick={sendProfile}>
              Save
            </button>
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
