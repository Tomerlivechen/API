import  { useContext, useEffect, useState } from "react";
import {
  Navbar
} from "react-bootstrap";
import "../Css/Navbar.scss";
import { ThemeContext } from "../ContextAPI/ThemeContext";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";
import { colors } from "../Constants/Patterns";
import { UserContext } from "../ContextAPI/UserContext";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";
import FilterBar from "./FilterBar";

function NavBar() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const location = useLocation();
  const { Theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedin, token, logout } = useContext(LoggedInContext);
  const { userInfo } = useContext(UserContext);
  const handelLogout = () => {
    logout();
    navigate("/");
  };
  const handelsearch = () => {
    setFilter((prevfilter) => !prevfilter);
    if (!filter) {
      navigate("search");
    }
    if (filter) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.pathname != "/search") {
      setFilter(false);
    }
  }, [location]);

  return (
    <>
      <Navbar
        id="app-navbar"
        className={`flex-row md:shadow-2xl shadow-slate-800  text-black flex gap-3 ${colors.Nav} ${colors.NavText}`}
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
        <NavLink className="p-3" to="Test">
          Test Space
        </NavLink>
        {isLoggedin && (
          <>
            <NavLink className="p-3" to="Feed">
              Feed
            </NavLink>
            <button
              className={` rounded-lg m-2 p-1  ${
                !filter ? colors.Nav : colors.SearchButtonActive
              } 
              `}
              onClick={handelsearch}
            >
              Search
            </button>
          </>
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
          <button className="p-3" onClick={handelLogout}>
            <LuLogOut />
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
      {filter && <FilterBar />}
    </>
  );
}

export default NavBar;
