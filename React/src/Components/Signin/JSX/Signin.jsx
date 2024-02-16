import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Signin.css";
import axios from "axios";
import img from "./img.jpg";

function Signin() {
  const [home, setHome] = useState("Sign In");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  // -------------------************************---------------------********************-------------------*****************-----------------************

  // const capitalizeFirstLetter = (value) => {
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // };

  const clearData = () => {
    setResponse("");
  };

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //submit function
  const handlesigninSubmit = async (e) => {
    e.preventDefault();

    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        signinData
      );
      console.log(res.data.message);
      console.log(res.data.token);
      console.log(res.data.username);
      setResponse(res.data.message);
      localStorage.setItem("token", res.data.token);

      navigate("/main");
    } catch (error) {
      setResponse("Sign In failed. ");
      console.error("Sign In error", error);
    }
    setSigninData({
      email: "",
      password: "",
    });
  };

  // ******************************-----------------------------------********************************--------------------------**********************

  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:5000/user/register",
        registrationData
      );
      console.log(res.data.message);
      setResponse(res.data.message);
    } catch (error) {
      console.error("Sign Up error", error);
      setResponse("Sign Up failed.");
    }

    setRegistrationData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form
        onSubmit={
          home === "Sign In" ? handlesigninSubmit : handleRegistrationSubmit
        }
        autoComplete="off"
      >
        <div className="main_signin">
          <div className="container1">
            <img src={img} alt="img" />
          </div>
          <div className="container2">
            <div className="header">
              <div className="text-login">{home} to your Account</div>
              {home === "Sign In" ? (
                <label className="subtitle">
                  Welcome back, {home} your account{" "}
                </label>
              ) : (
                <label className="subtitle">{home} your account </label>
              )}
            </div>

            <div className="inputs">
              {home === "Sign In" ? (
                <label className="subtitle-response"> {response} </label>
              ) : (
                <label className="subtitle-response">{response} </label>
              )}

              {home === "Sign in" ? (
                <div></div>
              ) : (
                <div className="input">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registrationData.username}
                    onChange={handleRegistrationChange}
                    required
                  />
                </div>
              )}
              {/* <label className='error'>{rederror}</label> */}

              <div className="input">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type={home === "Sign In" ? "text" : "email"}
                  name="email"
                  // style={{color:'#797979'}}
                  placeholder={
                    home === "Sign In" ? "Email or Username" : "Email"
                  }
                  value={
                    home === "Sign In"
                      ? signinData.email
                      : registrationData.email
                  }
                  onChange={
                    home === "Sign In"
                      ? handleSigninChange
                      : handleRegistrationChange
                  }
                  required
                />
              </div>
              {/* <label className='error'>{rederror}</label> */}

              <div className="input">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={
                    home === "Sign In"
                      ? signinData.password
                      : registrationData.password
                  }
                  onChange={
                    home === "Sign In"
                      ? handleSigninChange
                      : handleRegistrationChange
                  }
                  required
                />
              </div>
              {/* <label className='error'>{rederror}</label> */}
            </div>

            {home === "Sign Up" ? (
              <div></div>
            ) : (
              <div className="forgot-password">
                Forgot Password?{" "}
                <Link to="/forgot-password" className="link">
                  Click here
                </Link>
              </div>
            )}

            <div className="submit-container">
              <div
                className={home === "Sign In" ? "submit next" : "submit"}
                onClick={() => setHome("Sign Up")}
              >
                <button
                  className={home === "Sign Up" ? "white" : "blue"}
                  onClick={clearData}
                >
                  Sign Up
                </button>
              </div>

              <div
                className={home === "Sign Up" ? "submit next" : "submit"}
                onClick={() => setHome("Sign In")}
              >
                <button
                  // onClick={showError}
                  className={home === "Sign In" ? "white" : "blue"}
                  onClick={clearData}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signin;
