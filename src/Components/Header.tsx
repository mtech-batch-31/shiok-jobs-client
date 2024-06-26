// import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { IoIosLogOut } from "react-icons/io"
// import { ACCESS_TOKEN } from "../utilities/constants";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
// import Cookies from "js-cookie";
// import logo from '../Assets/word-logo.png';
// import axios, { AxiosResponse } from "axios";
import { getToken, removeToken } from "../utilities/auth";
import "./Header.css";
import { useAuth } from '../Auth/AuthContext';
import { API_URL } from "../utilities/constants";
import axiosInstance from "../utilities/axiosInstance";
import { AxiosError } from "axios";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    const token = getToken();
    //console.log("token from cookies: " + token + " " + new Date());
    if (token) {

      // call secured url, if success, login
      // axiosInstance
      // .get(API_URL.USER_PROFILE)
      // .then((res) => {
      //   console.log("api response ", res.data);
      //   login();
      // })
      // .catch((err) => {
      //   const error = err as AxiosError;
      //   console.error("error when calling API", error);
      //   logout();
      //   // setData(MOCK_JOBDETAILS_RESP);
      // });
      login();
    }

  
  }, [navigate, login, logout]);

  const onLogout = () => {
      //call api to revoke token
      let url = `${API_URL.LOGOUT}`
      axiosInstance
      .post(url, getToken(), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log("api response ", res);
      })
      .catch((error: AxiosError) => {
        console.error("error when calling API", error);
      });
      removeToken();
      logout();
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary px-4 shadow-sm">
      {/* <Container> */}
      <Navbar.Brand className="" href="/">
        {/* <img className="nav-logo" src={logo} alt="logo"></img> */}
        <div className="nav-logo fw-bold">shiok jobs</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav custom-nav">
        <Nav className="ms-auto  mx-3">
          {/* <Nav.Link className="ms-4"> */}
          <div className="nav-link ms-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item-active" : "nav-item"
              }
              to="/job"
            >
              Search Job
            </NavLink>
            {/* </Nav.Link> */}
          </div>
          {/* <Nav.Link className="ms-4"> */}
          <div className="nav-link ms-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item-active" : "nav-item"
              }
              to="/"
            >
              Company Reviews
            </NavLink>
          </div>
          {/* </Nav.Link> */}
          {/* <Nav.Link className="ms-4"> */}
          <div className="nav-link ms-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item-active " : "nav-item "
              }
              to="/"
            >
              Career Guide
            </NavLink>
          </div>
          {/* </Nav.Link> */}
          {/* <Nav.Link className="ms-4 "> */}
          <div className="nav-link ms-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item-active gold" : "nav-item gold"
              }
              to="/"
            >
              Employer
            </NavLink>
          </div>
          {/* </Nav.Link> */}
          {isLoggedIn ? (
            <>
            <div className="nav-link ms-4">
              <NavLink
                className={({ isActive }) =>
                isActive ? "nav-item-active blue" : "nav-item blue"
              }
                to="/profile"
              >
                Profile
              </NavLink>
            </div>

            <div className="nav-link ms-4">
            <NavLink
              className={({ isActive }) =>
              isActive ? "nav-item-active " : "nav-item "
            }
              to="/"
              onClick={onLogout}
            >
              Logout
            </NavLink>
            </div>
            </>
          ) : (
            <div className="nav-link ms-4">
              <NavLink className="nav-item blue fw-bold" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;
