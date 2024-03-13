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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CATEGORY,
  DATA_ADD,
  STYLEDATA,
  DATA_EDIT,
  STYLEDATACATEGORY,
} from "../../../Toast/Tost.js";

function WritePage() {
  const [questionData, setQuestionData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlertCategory, setShowAlertCategory] = useState(false);

  const [dropdownStates, setDropdownStates] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
  });

  const toggleDropdown = (itemName) => {
    setDropdownStates((prevState) => {
      const updatedStates = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === itemName ? !prevState[key] : false;
        return acc;
      }, {});
      return updatedStates;
    });
  };

  // -------------------------------------------

  const [model, setmodel] = useState(false);
  const [cusename, setCUsername] = useState("");

  const changeModal = () => setmodel(false);

  // -------------------------------------------------

  const fetchQuestion = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/question", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newData = res.data.question;
      setCUsername(res.data.cusername);
      // console.log("new",newData);
      setQuestionData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, [model]);

  useEffect(() => {
    if (showAlert) {
      toast.success(DATA_EDIT, STYLEDATA);
    }
    if (showAlert1) {
      toast.success(DATA_ADD, STYLEDATA);
    }
    if (showAlertCategory) {
      toast.error(CATEGORY, STYLEDATACATEGORY);
    }
  }, [showAlert, showAlert1, showAlertCategory]);

  const onSearch = async (e) => {
    const searchData = e.target.value;
    if (searchData) {
      const res = await axios.get(
        `http://localhost:5000/user/search/${searchData}`
      );
      const newData = res.data;

      if (newData) {
        setQuestionData(newData);
      }
    } else {
      try {
        const res = await axios.get("http://localhost:5000/user/question", {
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
          <h3 className="logo-text">Interview Catalyst</h3>
          {/* <h3 className="logo-username">{cusename}</h3> */}
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
          {/* <Hamburger/> */}
          <div className="btn-main">
            <Link className="btn-write" onClick={() => setmodel(true)}>
              <EditNoteIcon style={{ fontSize: "2.2rem" }} />
            </Link>
            {model && (
              <CustomModal
                closeModal={changeModal}
                username={cusename}
                setShowAlert1={setShowAlert1}
                setShowAlertCategory={setShowAlertCategory}
              />
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
      <ToastContainer
        style={{ marginTop: showAlertCategory ? "" : "2.5rem" }}
      />
      <div className="container-question">
        <div className="sidebar">
          <div className="sidebar-item" onClick={() => toggleDropdown("item1")}>
            <span>Java</span>
            {dropdownStates.item1 && (
              <div className="dropdown-content">
                <span>Java Fundamentals</span>
                <span>OOP with Java</span>
                <span>Collection Frameworks</span>
                <span>Generics</span>
                <span>Design Patterns</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item2")}>
            <span>React JS</span>
            {dropdownStates.item2 && (
              <div className="dropdown-content">
                <span>React Components</span>
                <span>Lifecycle Methods</span>
                <span>React state</span>
                <span>React Hooks</span>
                <span>React Router</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item3")}>
            <span>DSA</span>
            {dropdownStates.item3 && (
              <div className="dropdown-content">
                <span>Searching</span>
                <span>Sorting</span>
                <span>Stack & Queues</span>
                <span>Linked List</span>
                <span>Tree & Graph</span>
                <span>Hashing & Indexing</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item4")}>
            <span>DBMS</span>
            {dropdownStates.item4 && (
              <div className="dropdown-content">
                <span>RDBMS</span>
                <span>Normalisation</span>
                <span>Generaisation</span>
                <span>ACID Properties</span>
                <span>SQL Queries</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item5")}>
            <span>OOP concepts</span>
            {dropdownStates.item5 && (
              <div className="dropdown-content">
                <span>Classes/Objects</span>
                <span>Inheritance</span>
                <span>Polymorphism</span>
                <span>Encapsulation</span>
                <span>Abstraction</span>
                <span>Aggregation/Composition</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item6")}>
            <span>Operating System</span>
            {dropdownStates.item6 && (
              <div className="dropdown-content">
                <span>Scheduling algorithms</span>
                <span>Process Synchronization</span>
                <span>Sockets</span>
                <span>Semaphores</span>
                <span>Deadlocks</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item7")}>
            <span>JavaScript</span>
            {dropdownStates.item7 && (
              <div className="dropdown-content">
                <span>Arrow Functions</span>
                <span>Destructuring</span>
                <span>Hoisting</span>
                <span>Closures</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item8")}>
            <span>Python</span>
            {dropdownStates.item8 && (
              <div className="dropdown-content">
                <span>NumPy</span>
                <span>Pandas</span>
                <span>Regex</span>
                <span>OOP with Python</span>
              </div>
            )}
          </div>
          <div className="sidebar-item" onClick={() => toggleDropdown("item9")}>
            <span>Computer Network</span>
            {dropdownStates.item9 && (
              <div className="dropdown-content">
                <span>OSI Model</span>
                <span>IP Routing</span>
                <span>Different Protocols</span>
              </div>
            )}
          </div>
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("item10")}
          >
            <span>DevOps</span>
            {dropdownStates.item10 && (
              <div className="dropdown-content">
                <span>Kubernetes</span>
                <span>Docker</span>
                <span>CI/CD</span>
                <span>Jenkins</span>
              </div>
            )}
          </div>
        </div>

        <div className="main-part" style={{ whiteSpace: "pre-line" }}>
          {questionData.length > 0 ? (
            <div className="available" style={{ overflowY: "scroll" }}>
              {questionData.map((value, index) => (
                <AllQuestion
                  key={index}
                  currentValue={value}
                  setShowAlert={setShowAlert}
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
            <div className="not-available">
              <h1>No Results Found... </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WritePage;
