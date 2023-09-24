// import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { IoIosLogOut } from "react-icons/io"
import { ACCESS_TOKEN, ID_TOKEN, REFRESH_TOKEN } from "../utilities/constants";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
// import logo from '../Assets/word-logo.png';
import axios, { AxiosResponse } from "axios";
import "./Header.css";

interface AuthResponse {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: string;
  token_type: string;
}

interface AuthRequest {
  code: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

function Header() {
  const navigate = useNavigate();

  // let hasTokenValue = Cookies.get(ACCESS_TOKEN) !== undefined;
  //console.log(hasTokenValue);
  // const navigate = useNavigate();

  // const logout = () =>
  // {
  //     Cookies.remove(ACCESS_TOKEN);
  //     navigate('/');
  // }
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const authCode = queryParameters.get("code") as string;
    // console.log(`authorization code=${authCode}`);

    let request: AuthRequest = {
      code: authCode,
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
      client_secret: process.env.REACT_APP_COGNITO_CLIENT_SECRET as string,
      redirect_uri: process.env.REACT_APP_COGNITO_LOGIN_REDIRECT_URL as string,
    };

    // const token = Cookies.get(ACCESS_TOKEN);
    // TO DO: discuss where to verify token
    if (authCode) {
      getAuthToken();
    }

    async function getAuthToken() {
      try {
        const response: AxiosResponse = await axios.post(
          process.env.REACT_APP_COGNITO_AUTH_TOKEN_URL as string,
          request,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("successfully retrieved token");
        navigate("", { replace: true }); // This will navigate to the same URL without query parameters
        const authResponse = response?.data as AuthResponse;

        // console.log("auth response", authResponse);
        Cookies.set(ACCESS_TOKEN, authResponse.access_token, { path: "/" });
        Cookies.set(ID_TOKEN, authResponse.id_token, { path: "/" });
        Cookies.set(REFRESH_TOKEN, authResponse.refresh_token, { path: "/" });
      } catch (error) {
        console.log("error in getting auth token: ", error);
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(ID_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
      }
    }
  }, [navigate]);

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
          <div className="nav-link ms-4">
            <NavLink className="nav-item blue fw-bold" to="/login">
              Login
            </NavLink>
          </div>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;
