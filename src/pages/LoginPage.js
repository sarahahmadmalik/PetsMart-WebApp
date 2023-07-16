import React, { useState } from "react";
import "../styles/login.css"; // Import the CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Toaster  } from "react-hot-toast";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/auth.js";


const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSwap = () => {
    setIsSignUp(!isSignUp);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email: formInputs.email,
        password: formInputs.password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,{ position: "top-center",
        autoClose: 4000});
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        setTimeout(() => {
          navigate("/");
        }, 3000);
        
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("hi");
  
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        email: formInputs.email,
        name: formInputs.username,
        password: formInputs.password,
        phone: formInputs.phone,
        address: formInputs.address,
      });
  
      if (res.data.success) {
        console.log("Registration response:", res.data);
        toast.success("Registered Successfully", {
          position: "top-center",
          autoClose: 4000,
        });
        setIsSignUp(false);
      } else {
        toast.error(res.data.message);
        setIsSignUp(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
    console.log("Username:", formInputs.username);
    console.log("Password:", formInputs.password);
    console.log("Phone:", formInputs.phone);
    console.log("address:", formInputs.address);
    console.log("email:", formInputs.email);
    setFormInputs({
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    });
  };
  

  return (
    <div className="login-wrapper">
      <Toaster  />
      <div className="login-page">
        <div className={`left-side ${isSignUp ? "signup" : "login"}`}>
          {isSignUp ? (
            <>
              <h2>Sign up for an account</h2>
              {/* <p>Join us today to get amazing discounts</p> */}
              <button className="google-signin">
                <FontAwesomeIcon icon={faGoogle} id="google" />
                Sign in using Google
              </button>
              <form onSubmit={handleRegister}>
                <div className="inputs">
                  <div className="input-container">
                    <div>
                      <label
                        htmlFor="usernameField"
                        className="usernamelabel label"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="@"
                        id="usernameField"
                        required
                        name="username"
                        value={formInputs.username}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="emailField"
                        className="usernamelabel label"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="@"
                        id="usernameField"
                        required
                        name="email"
                        value={formInputs.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="passwordField"
                    className="usernamelabel label"
                  >
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      id="usernameField"
                      required
                      name="password"
                      value={formInputs.password}
                      onChange={handleInputChange}
                    />

                    <button type="button" onClick={togglePasswordVisibility}></button>
                  </div>
                  <label
                    htmlFor="usernameField"
                    className="usernamelabel label"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="usernameField"
                    required
                    name="phone"
                    value={formInputs.phone}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="usernameField"
                    className="usernamelabel label"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    id="usernameField"
                    required
                    name="address"
                    value={formInputs.address}
                    onChange={handleInputChange}
                  />
                  <div className="sign">
                    <button type="submit" className="login-btn" >
                      <span className="btn">Signup</span>
                    </button>
                    <div className="sign-links">
                      <p>already have an account?</p>
                      <button type="button" onClick={handleSwap}>Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={`right-side ${isSignUp ? "Signup" : "Login"}`}>
          {!isSignUp ? (
            <>
              <h2>{isSignUp ? "Sign up for an account" : "Welcome back!"}</h2>
              <p>Please login to your account</p>

              <button className="google-signin">
                <FontAwesomeIcon icon={faGoogle} id="google" />
                Sign in using Google
              </button>

              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <label
                    htmlFor="usernameField"
                    className="usernamelabel label"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="@"
                    id="usernameField"
                    required
                    name="email"
                    value={formInputs.email}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="passwordField"
                    className="usernamelabel label"
                  >
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      id="usernameField"
                      required
                      name="password"
                      value={formInputs.password}
                      onChange={handleInputChange}
                    />
                      <button type="button" onClick={togglePasswordVisibility}></button>
                  </div>
                  <button className="login-btn" type="submit">
                    <span className="btn">Login</span>
                  </button>
                  <div className="sign-links">
                    <p>don't have an account?</p>
                    <button onClick={handleSwap}>Sign up</button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
