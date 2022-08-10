import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import SunnyDays from "./video/SunnyDays.mp4";
import { Header, Footer, Home, Register, Login, Shop, About, PrivacyAndLegal } from "./";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  //   };

  //   // second, after you've defined your getter above
  //   // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);

  return (
    <div className="Showcase">
      <video muted loop autoPlay>
        <source src={SunnyDays} type="video/mp4" />
      </video>
      <div className="ShowcaseOverlay"></div>
      <div className="ShowcaseHeader">
        <Header />
      </div>
      <div className="ShowcaseFooter">
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
            />
          }
        />
        <Route
          path='/about'
          element={
            <About />
          }
        />
        <Route
        path='/privacy_legal'
        element={
          <PrivacyAndLegal />
        }
        />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
};

export default App;

{
  /* <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div> */
}
