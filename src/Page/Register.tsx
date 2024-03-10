import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button, Form, Container, Row, Col, Alert, useAccordionButton } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import "./styles/Register.css";
import { API_URL } from '../utilities/constants';
import React from "react";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

interface RegisterAccountState {
  email: string;
  password: string;
  confirmPassword: string;
  confirmCode : string;
}
interface RegisterResult {
  isSuccess: boolean;
  message: string;
}
interface APIResponse {
  message: string;
  returnCode: string;
}
const RegisterAccount = () => {
  const initFormState: RegisterAccountState = {
    email: "",
    password: "",
    confirmPassword: "",
    confirmCode: ""
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterAccountState>(initFormState);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isConfirmCodeValid, setIsConfirmCodeValid] = useState(true);
  const [registerResult, setRegisterResult] = useState<RegisterResult>({
    isSuccess: false,
    message: "",
  });

  const [isConfirmsignUp, setIsConfirmSignUp] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "email":
        setIsEmailValid(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
        );
        break;
      case "password":
        setIsPasswordValid(isConfirmsignUp || 
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
            formData.password
          )
        );
        break;
      case "confirmPassword":
        setIsConfirmPasswordValid(isConfirmsignUp ||
          formData.password === formData.confirmPassword
        );
        break;
      case "confirmCode":
          setIsConfirmCodeValid(!isConfirmsignUp ||
            formData.confirmCode.length > 0
          );
          break;
      }
  };
  const submitRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    //validate form data when submit

    const isEmailValidNew = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email);
    const isPasswordValidNew = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
        formData.password
      );
    const isConfirmPasswordValidNew = formData.password === formData.confirmPassword;
    setIsEmailValid(isEmailValidNew);
    setIsPasswordValid(isPasswordValidNew);
    setIsConfirmPasswordValid(isConfirmPasswordValidNew);
    //is form is valid
    if (isEmailValidNew && isPasswordValidNew && isConfirmPasswordValidNew) {
      try {
        const registerUrl =API_URL.REGISTER;
        console.log(
          "calling register API (" + process.env.NODE_ENV + ") " + registerUrl
        );
        const response = await axios.post(registerUrl, {
          email: formData.email,
          password: formData.password,
        });
        console.log(response);
        if (response.status !== 200) {
          //register unsuccess
          setRegisterResult({
            isSuccess: false,
            message: "Error when registering. Please try again.",
          });
          console.log(response);
        } else {
          setRegisterResult({
            isSuccess: true,
            message: "Please enter confirm code sent to your email.",
          });
          setIsConfirmSignUp(true);
        }
      } catch (err) {
        const error = err as AxiosError;
        const apiResponse = error.response?.data as APIResponse;
        //console.log(err.response?.data);
        if (apiResponse?.message)
          setRegisterResult({ isSuccess: false, message: apiResponse.message });
        else
          setRegisterResult({
            isSuccess: false,
            message: "Error when registering. Please try again.",
          });
        console.log("Error when calling API.");
        console.log(error);
        
        const errorResponse : any = error.response;
        if(errorResponse !== null){
          const data : any = errorResponse.data;
          console.log("error response", data);
        }
  
      }
    } else {
      console.log("form is invalid");
      setRegisterResult({ isSuccess: false, message: "" });
    }
  };
  const confirmSignupOnClickHandler = async() => {
    if(!isConfirmsignUp) setIsConfirmSignUp(true);
    else{
      //validate input
      var valid = true;
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)){
        setIsEmailValid(false);
        valid = false;
      }
      else
        setIsEmailValid(true);
      if(formData.confirmCode.length <= 0){
        setIsConfirmCodeValid(false);
        valid = false;
      }
      else setIsConfirmCodeValid(true);
      if(!valid)
        return;

      try{
        const response = await axios.post(API_URL.REG_CONFIRM, 
        {
          email: formData.email,
          code: formData.confirmCode,
        });
        console.log(response);
        if (response.status == 200) {
          setRegisterResult({
            isSuccess: true,
            message: "Welcome, you have successfully joined shiok jobs.",
          });
          setTimeout(function () {
            navigate("/login");
          }, 2000);

        }
      }catch( err){
        const error = err as AxiosError;
        setRegisterResult({
          isSuccess: false,
          message: "Error when registering. Please try again.",
        });
      }
    }
  }
  return (
    <Container fluid className="bgimage vh-100">
      <Row className="d-flex justify-content-center">
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-8 col-xs-10 col-11  mt-5  px-5 py-5 bg-white rounded-edges shadow-sm">
          <Row className="justify-content-center align-items-center">
            <div className=" mx-auto">
              <Form onSubmit={submitRegistration}>
                <h1 className="text-dark text-serif text-center pb-3">Join Us</h1>
                <Row>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={onChangeHandler}
                      isInvalid={!isEmailValid}
                      onBlur={onBlurHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {!isConfirmsignUp && 
                <Row>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={onChangeHandler}
                      value={formData.password}
                      isInvalid={!isPasswordValid}
                      onBlur={onBlurHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters, is alphanumeric
                      and contain special character.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                }
                {!isConfirmsignUp && 
                <Row>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={onChangeHandler}
                      value={formData.confirmPassword}
                      isInvalid={!isConfirmPasswordValid}
                      onBlur={onBlurHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Confirm password and password does not match.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                }
                {isConfirmsignUp && 
                <Row>
                  <Form.Group controlId="confirmCode">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.confirmCode}
                      onChange={onChangeHandler}
                      isInvalid={!isConfirmCodeValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      Confirm code is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                }
                <Row>
                  <p></p>
                  <Alert
                    variant={registerResult.isSuccess ? "success" : "danger"}
                    show={registerResult.message.length > 0}
                  >
                    {registerResult.message}
                  </Alert>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col>
                    <Link to="/login">
                      <Button variant="secondary" className="btn-custom">
                        Back to Login
                      </Button>
                    </Link>
                  </Col>
                  {!isConfirmsignUp && 
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-custom"
                    >
                      Register
                    </Button>
                  </Col>}
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="success" className="btn-custom"
                      onClick={confirmSignupOnClickHandler}>
                      Confirm Registration
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default RegisterAccount;
