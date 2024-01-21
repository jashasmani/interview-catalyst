import React, { useState, useRef, useEffect } from "react";
import "./EditProfile.css";

const EditProfile = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const modalRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
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

  return (
    <>
      <div className="edit-container" ref={modalRef}>
        <div className="edit-top">
          <h2 className="edit-color">PROFILE INFORMATION</h2>
        </div>
        <div className="edit-bottom">
          <div className="prof-pic">
            <h3 className="edit-color">Profile Photo</h3>
          </div>
          <div className="profile-pic">
            <img
              src="https://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg"
              alt="Profile"
            />
            <button className="btn-up">Update</button>
            <button className="btn-rm">Remove</button>
          </div>
          <div className="edit-info">
            <div className="edit-name">
              <h4 className="edit-color">Name*</h4>
              <input
                className="edit-input"
                type="text"
                name="name"
                required
                value={name}
                onChange={handleNameChange}
              />
              <div className="text">
                <h5 className="edit-color">Appears on your Profile Page.</h5>
                <div className="input-char">{name.length}/50</div>
              </div>
            </div>
            <div className="edit-name">
              <h4 className="edit-color">Bio</h4>
              <input
                className="edit-input"
                type="text"
                name="bio"
                required
                value={bio}
                onChange={handleBioChange}
              />
              <div className="text">
                <h5 className="edit-color">
                  Appears on your Profile Page and next to your stories.
                </h5>
                <div className="input-char">{bio.length}/100</div>
              </div>
            </div>
          </div>
          <div className="final-edit">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
