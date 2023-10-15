import "./styles/Login.css";

import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_URL, ID_TOKEN, REFRESH_TOKEN } from "../utilities/constants";
import { ACCESS_TOKEN } from "../utilities/constants";
import axiosInstance from "../utilities/axiosInstance";
import  { AxiosError } from "axios";
import { useAuth } from '../Auth/AuthContext';

interface LoginFormState {
  email: string;
  password: string;
}

// interface ResponseData {
//   message: string;
//   accessToken: string;
//   refreshToken: string;
//   idToken: string;
// }

const Login = () => {
  const { login } = useAuth();
  const initialFormData: LoginFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<LoginFormState>(initialFormData);
  // const [responseData, setResponseData] = useState<ResponseData | null>(null); // eslint-disable-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get("redirect") || "/";

  useEffect(() => {
    if (Cookies.get(ACCESS_TOKEN)) {
      // setIsLoggedIn(true);
    }
  }, []);

  const removeToken = () => {
    Cookies.remove(ACCESS_TOKEN);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setResponseData(null);
    setErrorMessage("");
    try {
      const response = await axiosInstance.post(API_URL.LOGIN,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("api response: ", response.data); // uncommment to see logs!
      if (response.data.accessToken == null) {
        setErrorMessage("Wrong password. Try again or contact us to reset it.");
      } else {
        const token = response.data.accessToken;
        Cookies.set(ACCESS_TOKEN, token, { path: "/" });
        Cookies.set(REFRESH_TOKEN, response.data.refreshToken, { path: "/" });
        Cookies.set(ID_TOKEN, response.data.idToken, { path: "/" });
        // setResponseData(response.data); 

        console.log("redirect to: ", redirectUrl); // uncommment to see logs!
        login();
        navigate(redirectUrl);
      }
    } catch (err) {
      let errorMessage = "Something went wrong";
      const error = err as AxiosError;
      console.log("api response error: ", error);
      const errorResponse : any = error.response;
      if(errorResponse){
        const data : any = errorResponse.data;
        console.log("error response", data);
        if (data.message != null){
          errorMessage = data.message;
        }
      }
      setErrorMessage(errorMessage);
      removeToken();
    }
  };

  return (
    <Container fluid className="bgimage vh-100">
      <Row className="d-flex justify-content-center">
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-8 col-xs-10 col-11  mt-5 p-5 bg-white rounded-edges shadow-sm">
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <h1 className="text-dark text-serif text-center pb-3">Welcome back</h1>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {errorMessage && (
              <div className="text-danger mr-2 d-inline-block py-3">
                {errorMessage}
              </div>
            )}
            <br />
            <Row className="d-flex justify-content-between align-items-center">
              <Col>
                <Link to="/register">
                  <Button variant="secondary" className="btn-custom">
                    Register
                  </Button>
                </Link>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="btn-custom">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
