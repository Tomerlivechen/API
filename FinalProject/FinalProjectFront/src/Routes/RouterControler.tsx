import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import About from "./About";
import UsersPage from "./UsersPage";
import Feed from "./Feed";
import Profile from "./Profile";
import NavBar from "../Bars/NavBar";

function RouterControler() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="About" element={<About />} />
          <Route path="Feed" element={<Feed />} />
          <Route path="UsersPage" element={<UsersPage />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouterControler;
