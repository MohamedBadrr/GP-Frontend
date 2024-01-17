import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Header() {
  const location = useLocation()
  const { pathname} = location;
  return (
    <>
      {pathname === "/login" || pathname === "/register"  ? (
        ""
      ) : (
        <Navbar collapseOnSelect expand="lg" className="bg-bg-transparent">
          <Container>
            <Navbar.Brand href="#home" className="me-auto">
              LOGO
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="me-auto">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
              <Link className="nav-link" to={"/games"}>
                Games
              </Link>
              <Link className="nav-link" to={"/aboutUs"}>
                AboutUs
              </Link>
              <Link className="nav-link" to={"/more"}>
                More
              </Link>
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
}
