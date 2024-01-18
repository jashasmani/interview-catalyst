import React, { useEffect, useState, useRef } from "react";
import "../CSS/Main.css";
import search from "../PNG/search.png";
import notification from "../PNG/notification-bell.png";
import writing from "../PNG/writing.png";
import account from "../PNG/account.png";
import AllQuestion from '../../Message/JSX/AllQuestion'
import CustomModal from '../../Write/Input';
import '../../Write/Write.css';
import { Link } from 'react-router-dom';
import axios from "axios";

function WritePage() {


  const [activeTab, setActiveTab] = useState("For You");
  const [questionData, setQuestionData] = useState([]);
  // const [searchData, setSearchData] = useState("");


  // const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);


  // -------------------------------------------

  const [model, setmodel] = useState(false);

  const changeModal = () => setmodel(false);

  // -------------------------------------------------


  useEffect(() => {

    const fetchData = async () => {

      console.log('Fetching data...');

      try {
        const res = await axios.get('http://localhost:8000/user/question');
        const newData = res.data;
        setQuestionData(newData);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, [])



  const onSearch = async (e) => {

    const searchData = e.target.value

    if (searchData) {

      const res = await axios.get(`http://localhost:8000/user/search/${searchData}`);
      const newData = res.data;

      if (newData) {
        setQuestionData(newData);
      }
    }
    else {
      try {
        const res = await axios.get('http://localhost:8000/user/question');
        const newData = res.data;
        setQuestionData(newData);
      }
      catch (error) {
        console.log(error);
      }
    }
  }


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  // useEffect(() => {
  //   // Update content height whenever content changes
  //   if (contentRef.current) {
  //     setContentHeight(contentRef.current.clientHeight);
  //   }



  // }, [activeTab]);

  return (
    <div className="main-main">
      <div className="top-main">
        {/* Your existing code for header */}
        <div className="logo-main"></div>
        <div className="search-main">
          <img src={search} className="image-main" alt="" />

          <input
            type="search"
            placeholder="Search.."
            id="search"
            onChange={onSearch}
            required />
        </div>


        <div className="side-main">
          <div className="btn-main">
            <Link
              className="btn-write"
              onClick={() => setmodel(true)}>
              <img src={writing} alt="" />
              Write
            </Link>
            {model && <CustomModal closeModal={changeModal} />}
          </div>


          <div className="notification-main">
            <img src={notification} alt="" />
          </div>
          <div className="account-main">
            <img src={account} alt="" />
          </div>
        </div>
      </div>

      <div className="tabs-main">
        <div className="tab-header">
          <div
            className={activeTab === "For You" ? "active" : ""}
            onClick={() => handleTabClick("For You")}
          >
            For You
          </div>
          <div
            className={activeTab === "Following" ? "active" : ""}
            onClick={() => handleTabClick("Following")}
          >
            Following
          </div>
        </div>
        <div className="tab-indicator"></div>
        <div className="tab-body" ref={contentRef}>
          <div className={activeTab === "For You" ? "active" : ""}>
            <h1>For You</h1>

            {/* <p> */}





            {questionData.length > 0 ? (
              <div>
                {questionData.map((value, index) => (
                  <AllQuestion key={index} currentValue={value} />
                ))}

              </div>
            ):<div><h1>No Results Found...  </h1></div>}


            {/* </p> */}
          </div>
          <div className={activeTab === "Following" ? "active" : ""}>
            <h1>Following</h1>


          </div>
        </div>
      </div>

    </div>
  );
}

export default WritePage;