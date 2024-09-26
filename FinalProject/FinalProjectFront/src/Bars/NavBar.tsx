import React from "react";
import {
  Navbar,
  Form,
  Nav,
  Container,
  Col,
  Button,
  Image,
  NavDropdown,
} from "react-bootstrap";
import "../Css/Navbar.scss";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Navbar
        id="app-navbar"
        className=" md:shadow-2xl shadow-slate-800 text-yellow-100 bg-lime-500 dark:bg-green-900 flex gap-3"
      >
        <NavLink className="p-3" to="/">
          Main
        </NavLink>
        <NavLink className="p-3" to="About">
          About
        </NavLink>
        <NavLink className="p-3" to="Feed">
          Feed
        </NavLink>
        <NavLink className="p-3" to="UsersPage">
          Users Page
        </NavLink>
        <div className=" flex-1"></div>
        <NavLink className="p-3" to="Profile">
          Profile
        </NavLink>
        <NavLink className="p-3" to="Register">
          Register
        </NavLink>
        <NavLink className="p-3" to="Login">
          Login
        </NavLink>
        <NavLink className="p-3" to="Logout">
          Logout
        </NavLink>
      </Navbar>
    </>
  );
}

export default NavBar;
