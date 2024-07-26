import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import "./Auth.css";
const Verify = () => {
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log(otpValue);
    await verifyOtp(Number(otpValue), navigate);
  };
  return (
    <div className="main">
      <form className="otp-Form" onSubmit={submitHandler}>
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your mobile number
        </p>
        <div className="inputContainer">
          {otp.map((data, index) => (
            <input
              required="required"
              maxLength="1"
              type="text"
              className="otp-input"
              id="otp-input1"
              name="otp"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button className="verifyButton" type="submit">
          Verify
        </button>

        <p className="resendNote">
          Didn't receive the code?{" "}
          <button className="resendBtn">Resend Code</button>
        </p>
      </form>
    </div>
  );
};

export default Verify;
