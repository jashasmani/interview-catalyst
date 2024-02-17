import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesignin = async () => {
    try {
      const response = await axios.post("https://interview-catalyst.onrender.com/api/signin", {
        email,
        password,
      });
      // const token  = response.data;
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home1");
    } catch (error) {   
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="main-1">
      <h2 className="title-demo">signin</h2>
      <div className="i1">
        <label>Email:</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="i1">
        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handlesignin} className="b1">
        signin
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signin;
