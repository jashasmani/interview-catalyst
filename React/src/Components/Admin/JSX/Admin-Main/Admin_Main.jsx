import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../../CSS/Admin_Main.css";
import AdminQuestion from "../../../Message/JSX/AllQuestion";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "../../../Write/Write.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WritePage() {
  const [questionData, setQuestionData] = useState([]);
  const navigate=useNavigate();
  // -------------------------------------------

  const [cusename, setCUsername] = useState("");

  // -------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");

      try {
        const res = await axios.get("https://interview-catalyst.onrender.com/user/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newData = res.data.question;
        setCUsername(res.data.cusername);
        // console.log(newData);
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
        `https://interview-catalyst.onrender.com/user/search/${searchData}`
      );
      const newData = res.data;

      if (newData) {
        setQuestionData(newData);
      }
    } else {
      try {
        const res = await axios.get("https://interview-catalyst.onrender.com/user/question", {
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
    <div className="main-main-admin">
      <nav className="top-main-admin">
        <div className="logo-main-admin">
          <h3 className="logo-text">Interview Catalyst</h3>
        </div>

        <div className="search-main-admin">
          <SearchIcon className="image-main" />

          <input
            type="search"
            placeholder="Search question.."
            id="search"
            onChange={onSearch}
            required
          />
        </div>
        <div className="admin-name">
          <div className="notification-main">
            <NotificationsActiveIcon style={{ fontSize: "2rem",marginRight:'1rem',cursor:'pointer' }} onClick={()=>navigate('/admin_cheack_main  ')}/>
          </div>
          <h1>{cusename}</h1>
        </div>
      </nav>

      <div className="main-part-admin">
        <div style={{ whiteSpace: "pre-line" }}>
          {questionData.length > 0 ? (
            <div>
              {questionData.map((value, index) => (
                <AdminQuestion
                  key={index}
                  currentValue={value}
                  admin={cusename}
                />
              ))}

              <div className="semaple">
                <div className="dot-spinner">
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="not-found">
              <h1>No Results Found... </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WritePage;
