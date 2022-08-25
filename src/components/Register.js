import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../style/Register.css";
import { registerPerson } from "../api";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate()

const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const registeredPerson = await registerPerson(
        username,
        password,
        email,
        firstName,
        lastName
      );
      if (registeredPerson) {
        setUsername("");
        setPassword("");
      }
      navigate("/login");
      alert("You have successfully registered to Top Secret Shirts LA!")
    } catch (error) {
      alert(error.message);
    }
  }

  function showPasswordFunc() {
    setHidePassword(false);
    setPasswordType("text");
  }

  function hidePasswordFunc() {
    setHidePassword(true);
    setPasswordType("password");
  }

  return (
    <motion.div
      className="RegisterContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="RegisterHeader">Register</h1>
      </div>
      <form onSubmit={handleRegister} className="RegisterForm">
        <input
          className="RegisterInput"
          type="text"
          placeholder="Enter your first name here..."
          name="firstName"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <input
          className="RegisterInput"
          type="text"
          placeholder="Enter your last name here..."
          name="lastName"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <input
          className="RegisterInput"
          type="text"
          placeholder="Enter username here..."
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <input
          id="registerPasswordInput"
          className="RegisterInput"
          type={passwordType}
          placeholder="Enter password here..."
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <input
          className="RegisterInput"
          type="text"
          placeholder="Enter email here..."
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button className="RegisterButton" type="Submit">
          Register
        </button>
        <br></br>
        <br></br>
        <NavLink id="RegisterButton" className="LoginInsteadButton" to="/login">
          Already a Member? Login.
        </NavLink>
      </form>
      {hidePassword ? (
        <button
          id="RegisterButton"
          className="ShowPasswordButton"
          onClick={showPasswordFunc}
        >
          Show Password
        </button>
      ) : (
        <button
          id="RegisterButton"
          className="ShowPasswordButton"
          onClick={hidePasswordFunc}
        >
          Hide Password
        </button>
      )}
    </motion.div>
  );
};

export default Register;
