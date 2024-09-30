import React, { useContext } from "react";
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
import { ThemeContext } from "../ContextAPI/ThemeContext";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { colors } from "../Constants/Patterns";
import { UserContext } from "../ContextAPI/UserContext";
import { LoggedInContext } from "../ContextAPI/LoggedinContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { Theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedin, token, logout } = useContext(LoggedInContext);
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Navbar
        id="app-navbar"
        className={`md:shadow-2xl shadow-slate-800 text-yellow-100 flex gap-3 ${colors.Nav} ${colors.NavText}`}
      >
        <NavLink className="p-3" to="/">
          Main
        </NavLink>
        <NavLink className="p-3" to="About">
          About
        </NavLink>
        <NavLink className="p-3" to="Profile">
          Profile
        </NavLink>
        {isLoggedin && (
          <NavLink className="p-3" to="UsersPage">
            Users Page
          </NavLink>
        )}
        <div className=" flex-1"></div>

        {!isLoggedin && (
          <>
            <NavLink className="p-3" to="Register">
              Register
            </NavLink>
            <NavLink className="p-3" to="Login">
              Login
            </NavLink>
          </>
        )}
        {isLoggedin && (
          <button className="p-3" onClick={logout}>
            Logout
          </button>
        )}
        <button onClick={toggleTheme} className="rounded-lg p-2">
          {Theme == "dark" ? (
            <BsFillLightbulbFill />
          ) : (
            <BsFillLightbulbOffFill />
          )}
        </button>
      </Navbar>
    </>
  );
}

export default NavBar;
