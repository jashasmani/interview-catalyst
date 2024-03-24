import "./App.css";
import React from "react";
import Forgot from "./Components/Forgot/Forgot";
import Signin from "./Components/Signin/JSX/Signin";
import Home from "./Components/Home/Home";
import AllQuestion from "./Components/Message/JSX/AllQuestion";
import Write from "./Components/Write/Write";
import Input from "./Components/Write/Input";
import Main from "./Components/Main/JSX/Main";
import AdminMain from "./Components/Admin/JSX/Admin-Main/Admin_Main";
import AdminCheackAns from "./Components/Admin/JSX/Admin-Cheack-Ans/Admin_Cheack_Ans";
import AdminCheackMain from "./Components/Admin/JSX/Admin-Cheack-Ans/Admin_Cheack_main";
import Confirm from "./Components/Forgot/Confirm";
import Profile from "./Components/Profile/profile/Profile";
import EditProfile from "./Components/Profile/EditProfile/EditProfile";
import ABC from "./Components/EditorText/abc";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {<Route path="/" element={<Home />} />}
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/confirm/:id/:token" element={<Confirm />} />
          <Route path="/allquestion" element={<AllQuestion />} />
          <Route path="/write" element={<Write />} />
          <Route path="/input" element={<Input />} />
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/admin_check_ans" element={<AdminCheackAns />} />
          <Route path="/admin_check_main" element={<AdminCheackMain />} />
          <Route path="/abc" element={<ABC />} />

          {/* <Route path="/log1" element={<Log1 />} /> 
          <Route path="/home1" element={<Home1 />} /> */}
        </Routes>
      </Router>

    </>
  );
}

export default App;
