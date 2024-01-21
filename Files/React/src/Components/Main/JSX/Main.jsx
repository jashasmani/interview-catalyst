import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import "../CSS/Main.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Person2Icon from "@mui/icons-material/Person2";
import AllQuestion from "../../Message/JSX/AllQuestion";
import CustomModal from "../../Write/Input";
import "../../Write/Write.css";
import { Link } from "react-router-dom";
import axios from "axios";

function WritePage() {
  const [questionData, setQuestionData] = useState([]);

  // -------------------------------------------

  const [model, setmodel] = useState(false);
  const [cusename, setCUsername] = useState("");

  const changeModal = () => setmodel(false);

  // -------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");

      try {
        const res = await axios.get("http://localhost:8000/user/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newData = res.data.question;
        setCUsername(res.data.cusername);
        // JSON.stringify(newData);
        console.log(newData);
        setQuestionData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSearch = async (e) => {
    const searchData = e.target.value;

    if (searchData) {
      const res = await axios.get(
        `http://localhost:8000/user/search/${searchData}`
      );
      const newData = res.data;

      if (newData) {
        setQuestionData(newData);
      }
    } else {
      try {
        const res = await axios.get("http://localhost:8000/user/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newData = res.data.question;
        setCUsername(res.data.cusername);
        setQuestionData(newData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main-main">
      <nav className="top-main">
        <div className="logo-main">
          {/* <img src={logo} alt="" /> */}
          {cusename}
        </div>

        <div className="search-main">
          <SearchIcon className="image-main" />

          <input
            type="search"
            placeholder="Search question.."
            id="search"
            onChange={onSearch}
            required
          />
        </div>

        <div className="side-main">
          <div className="btn-main">
            <Link className="btn-write" onClick={() => setmodel(true)}>
              <EditNoteIcon style={{ fontSize: "2.2rem" }} />
            </Link>
            {model && (
              <CustomModal closeModal={changeModal} username={cusename} />
            )}
          </div>

          <div className="notification-main">
            <NotificationsActiveIcon style={{ fontSize: "2rem" }} />
          </div>
          <div className="account-main">
            <Link to="/profile">
              <Person2Icon style={{ fontSize: "2rem" }} />
            </Link>
          </div>
        </div>
      </nav>

      <div className="main-part">
        <div className="sidebar"></div>

        <div style={{ whiteSpace: "pre-line" }}>
          {questionData.length > 0 ? (
            <div>
              {questionData.map((value, index) => (
                <AllQuestion key={index} currentValue={value} />
              ))}
            </div>
          ) : (
            <div>
              <h1>No Results Found... </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WritePage;
