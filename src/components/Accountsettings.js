import React, { useEffect, useState } from "react";
import ProfileIconAccPage from "./Photo/ProfileIconAccPage.png";
import { motion } from "framer-motion";
import "../style/Accountsettings.css";
import { getUser, updatePersonUsername, updatePersonEmail, updatePersonPassword } from "../api";

const Accountsettings = () => {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("")
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"))
    setEmail(localStorage.getItem("email"))
  }, [username, email])

  async function handleUsername(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const username = localStorage.getItem("username")
      localStorage.removeItem("username");
      await updatePersonUsername(token, username, newUsername, id);
      localStorage.setItem("username", newUsername);
      setUsername(newUsername)
      alert("You have updated your username!")
    } catch (error) {
      throw error;
    }
  }

  async function handleEmail(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const email = localStorage.getItem("email")
      localStorage.removeItem("email");
      await updatePersonEmail(token, email, newEmail, id);
      localStorage.setItem("email", newEmail);
      setEmail(newEmail)
      alert("You have updated your email!")
    } catch (error) {
      throw error;
    }
  }
  
  async function handleUpdatePassword(event) {
    event.preventDefault();
    const username = localStorage.getItem("username")
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const password = oldPassword
    const currentPassword = await getUser(id, username, password)
    try{
      if (currentPassword) {
        if (newPassword === verifyPassword) {
          await updatePersonPassword(token, username, oldPassword, id, newPassword)
        }
      }
      alert("You have updated your password!")
    } catch (error) {
      throw error;
    }
  }

  return (
    <motion.div
      className="AccSettingsContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="AccSettingsHeader">Account Settings</div>
      <div className="AccSettingsContainerLeft">
        <div>
          {first_name} {last_name}
        </div>
        <img className="AccSettingsPic" src={ProfileIconAccPage} />
      </div>
        <div className="AccSettingsContainerRight">
      <form onSubmit={handleUsername}>
          <div className="AccSettingsOptions">
            Username: {username}
            <br></br>
            <br></br>
            <div>
              <input
                className="AccSettingsChangeBar"
                name="Username"
                type="text"
                placeholder="New Username Here..."
                value={newUsername}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <button type="submit" className="updateUserButton">
                Update Username
              </button>
            </div>
          </div>
          </form>
          <form onSubmit={handleEmail}>
          <div className="AccSettingsOptions">
            E-mail: {email}
            <br></br>
            <br></br>
            <div>
              <input
                className="AccSettingsChangeBar"
                name="E-mail"
                type="text"
                placeholder="New E-mail Here..."
                value={newEmail}
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <button type="submit" className="updateUserButton">
                Update Email
              </button>
            </div>
          </div>
      </form>
      <form onSubmit={handleUpdatePassword}>
      <div className="AccSettingsOptionsPassword">
            <div>
            <input
                className="AccSettingsChangeBar"
                name="Password"
                type="password"
                placeholder="Current Password..."
                value={oldPassword}
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <input
                className="AccSettingsChangeBar"
                name="Password"
                type="password"
                placeholder="New Password Here..."
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <input
                className="AccSettingsChangeBar"
                name="Password"
                type="password"
                placeholder="Verify New Password..."
                value={verifyPassword}
                onChange={(event) => {
                  setVerifyPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <button className="updatePasswordButton" type="Submit">Update Password</button>
      </form>
      </div>
    </motion.div>
  );
};

export default Accountsettings;
