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
import { useNavigate, useLocation } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Navbar className="fixed-top">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Main</Navbar.Brand>
          <Nav.Link onClick={() => navigate("About")}>About</Nav.Link>
          <Nav.Link onClick={() => navigate("Feed")}>Feed</Nav.Link>
          <Nav.Link onClick={() => navigate("UsersPage")}>Users Page</Nav.Link>
          <Nav.Link onClick={() => navigate("Profile")}>Profile</Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
