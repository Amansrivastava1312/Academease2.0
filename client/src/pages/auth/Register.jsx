import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const Style = {
    marginTop: "20px",
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };
  return (
    <div className="main">
      <div className="container">
        <div className="heading">
          <img src="academease.png" className="image" />
        </div>
        <form className="form" onSubmit={submitHandler}>
          <input
            placeholder="Name"
            id="email"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />

          <input
            placeholder="E-mail"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />

          <button
            style={Style}
            disabled={btnLoading}
            type="submit"
            className="login-button"
          >
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <span className="agreement">
          <a href="#">OTP will be sent to your email for verification</a>
        </span>
      </div>
    </div>
  );
};

export default Register;
