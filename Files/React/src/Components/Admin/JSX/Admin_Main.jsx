import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../CSS/Admin_Main.css";
import Admin_Question from './Admin_Question';
import "../../Write/Write";
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
      </nav>

      <div className="main-part">
        <div className="sidebar"></div>

        <div style={{ whiteSpace: "pre-line" }}>
          {questionData.length > 0 ? (
            <div>
              {questionData.map((value, index) => (
                <Admin_Question key={index} currentValue={value} />
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
