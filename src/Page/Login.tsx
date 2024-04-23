import "./styles/Login.css";

import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { API_URL, ID_TOKEN, REFRESH_TOKEN } from "../utilities/constants";
import { ACCESS_TOKEN } from "../utilities/constants";
import axios, { AxiosError } from "axios";
import { useAuth } from '../Auth/AuthContext';
import axiosInstance from "../utilities/axiosInstance";
import { JSEncrypt } from "jsencrypt";

// import { Auth } from '@aws-amplify/auth';
// import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
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

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [customState, setCustomState] = useState<string | null>(null);


// const federatedSignInUpdateUser = async () : Promise<void> => {
//   try {
//     const test = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})

//     test.authenticated;
    
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

// const getUser = async (): Promise<void> => {
//     // return Auth.currentAuthenticatedUser()
//     //   .then(userData => {userData
//     //   console.log(userData);
//     //     setUser(userData)
//     //   })
//     //   .catch(() => console.log('Not signed in'));
//     try {
//     const currentUser = await Auth.currentAuthenticatedUser();
//     setUser(currentUser);
//     //console.log(`What is the current user: ${JSON.stringify(currentUser)}`);
//     Auth.currentSession().then(res=>{
//       Cookies.set(ACCESS_TOKEN, JSON.stringify(res.getAccessToken()), { path: "/" });
//       Cookies.set(REFRESH_TOKEN, JSON.stringify(res.getRefreshToken()), { path: "/" });
//       Cookies.set(ID_TOKEN, JSON.stringify(res.getIdToken()), { path: "/" });     

//       login();
//       navigate(redirectUrl);
//     })
//   } catch(error) {
//     console.error(error);
//     console.log("Not signed in");
//   }
// };

  const [formData, setFormData] = useState<LoginFormState>(initialFormData);
  // const [responseData, setResponseData] = useState<ResponseData | null>(null); // eslint-disable-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams3] = useSearchParams();
  const code = queryParams3.get('code');
  const state = queryParams3.get('state');

  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get("redirect") || "/profile";

  useEffect(() => {
    // getUser();
    if (Cookies.get(ACCESS_TOKEN)) {
      // setIsLoggedIn(true);
    }
    const config = {
      method: 'POST',
      url: "https://shiok-jobs.auth.ap-southeast-1.amazoncognito.com/oauth2/token",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Basic NTRjcTE2MW90a3JmNHBxbm9kczc1YjJsY206MWtjdDMxbHJwOTF0cTJrcDZwbDFibmVtcmZiMmtlZmxiYW5kNnRhNHZvMHBsYmpqYWc5bw==",
        // Add any other headers as needed
      },
      data: {
        grant_type: "authorization_code",
        redirect_uri: "https://d2loqognvf0v5n.cloudfront.net/login",
        client_id: "54cq161otkrf4pqnods75b2lcm",
        code: code,
        code_verifier: state,
        scope: "phone email openid"
      }
    };
    axiosInstance(config)
    .then((response) => {
      if (response.status === 200) {
        const token = response.data.access_token;
        Cookies.set(ACCESS_TOKEN, token, { path: "/" });
        Cookies.set(REFRESH_TOKEN, response.data.refresh_token, { path: "/" });
        Cookies.set(ID_TOKEN, response.data.id_token, { path: "/" });
  

        console.log("redirect to: ", redirectUrl); // uncommment to see logs!
        login();
        navigate(redirectUrl);
      } else {
        console.error('Failed to update seeking status');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
 
  }, []);

  const removeToken = () => {
    Cookies.remove(ACCESS_TOKEN);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  function encrypt(plaintext: string){
    var encrypt = new JSEncrypt();

    var publicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy1AvASP1r6YIXeuLH0j5
    CQsM+ZLrHDnIZ407mw76szq6+QMDspK65bp2ui8P9KvD0GAOTSpSUXY9qQHe3c/N
    3FNf7Abp1LjAKqniFO7PbFW8STBYmLfpAmcHxCxSu/E2nfW8Y2yCR+gxIa+RiI9f
    WO2JV2JrOS2SF/3/sxqNjfdX2/mHMC5yrpOjc/fMvzoI/83RD2EgLz3+y76ehPf9
    BpDS82pTljBveNXqhJbQmCvcqbs6bmi0ZKBkfcDFFQas4ZO6WgSuT/YaTSIfjvyw
    u+oG+XpEi+UhsgJiqHqFXlAj5YUqzsUNy+ESVT4vMUQqil2OEJO8UL+XzGs354SA
    KwIDAQAB
    -----END PUBLIC KEY-----`;
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(plaintext);
  }
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setResponseData(null);
    setErrorMessage("");
    try {
      const response = await axios.post(API_URL.SIGIN,
        {
          email: formData.email,
          password: encrypt(formData.password),
        }
      );
      console.log("api response: ", response.data); // uncommment to see logs!
      if (response.data.authenticationResult.accessToken == null) {
        setErrorMessage("Wrong password. Try again or contact us to reset it.");
      } else {
        const token = response.data.authenticationResult.accessToken;
        Cookies.set(ACCESS_TOKEN, token, 
          { path: "/",
            httpOnly: true,
            secure: true // Set to true if using HTTPS
         });
        console.log("test normal login dont store accessToken ");
        Cookies.set(REFRESH_TOKEN, response.data.authenticationResult.refreshToken, { path: "/" });
        Cookies.set(ID_TOKEN, response.data.authenticationResult.idToken, { path: "/" });
        // setResponseData(response.data); 

        console.log("redirect to: ", redirectUrl); // uncommment to see logs!
        login();
        navigate(redirectUrl);
      }
    } catch (err) {
      let errorMessage = "Something went wrong";
      const error = err as AxiosError;
      console.log(`error when calling : ${API_URL.LOGIN}, error: `, error);
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
        <div className="App">
        <Link to="https://shiok-jobs.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=54cq161otkrf4pqnods75b2lcm&redirect_uri=https://d2loqognvf0v5n.cloudfront.net/login&scope=openid+email+phone&identity_provider=Google&state=9RmWtPYDDYBmw41IVDm13MHXifQoVyVK">
                  <Button variant="primary" className="btn-custom">
                    Open Google 2
                  </Button>
                </Link>

       {/* <button onClick={() => federatedSignInUpdateUser()}>Open Google</button> */}
    </div>
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
