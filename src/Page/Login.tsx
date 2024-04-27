import './styles/Login.css';

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL, ID_TOKEN, REFRESH_TOKEN } from '../utilities/constants';
import { ACCESS_TOKEN } from '../utilities/constants';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../Auth/AuthContext';
import axiosInstance from '../utilities/axiosInstance';
import GoogleButton from 'react-google-button';

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
    email: '',
    password: '',
  };

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const [oauthParams] = useSearchParams();
  const code = oauthParams.get('code');
  const tokenState = oauthParams.get('state');
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/profile';
  const OAUTH_STATE_KEY = 'react-use-oauth2-state-key';

  const saveState = (state: string) => {
    sessionStorage.setItem(OAUTH_STATE_KEY, state);
  };

  const removeState = () => {
    //eslint-disable-line no-unused-vars
    sessionStorage.removeItem(OAUTH_STATE_KEY);
  };

  // GENERATING CODE VERIFIER
  function dec2hex(dec: any) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  function generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
  }

  function sha256(plain: any) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  function base64urlencode(a: any) {
    var str = '';
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return window
      .btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async function generateCodeChallengeFromVerifier(v: any) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }

  const getAuth = useCallback(() => {
    // 1. Generate and save state
    const authorizeState = generateCodeVerifier();
    saveState(authorizeState);
    let code_challenge = null;
    (async () => {
      code_challenge = await generateCodeChallengeFromVerifier(
        sessionStorage.getItem('react-use-oauth2-state-key')
      );
      window.location.href = `https://shiok-jobs.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=5i5fgd57n42nmala1b7ahmfsl0&redirect_uri=${API_URL.REDIRECT_URL_PROD}/login&state=${authorizeState}&scope=openid+email+phone&identity_provider=Google&code_challenge_method=S256&code_challenge=${code_challenge}`;
    })();
    removeState();
  }, []);

  useEffect(() => {
    // getUser();
    if (Cookies.get(ACCESS_TOKEN)) {
      // setIsLoggedIn(true);
    }
    const config = {
      method: 'POST',
      url: 'https://shiok-jobs.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Add any other headers as needed
      },
      data: {
        grant_type: 'authorization_code',
        redirect_uri: `${API_URL.REDIRECT_URL_PROD}/login`,
        client_id: '5i5fgd57n42nmala1b7ahmfsl0',
        code: code,
        code_verifier: tokenState,
        scope: 'phone email openid',
      },
    };
    axiosInstance(config)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.access_token;
          Cookies.set(ACCESS_TOKEN, token, { path: '/' });
          Cookies.set(REFRESH_TOKEN, response.data.refresh_token, {
            path: '/',
          });
          Cookies.set(ID_TOKEN, response.data.id_token, { path: '/' });
          console.log('refresh token ' + response.data.refresh_token);

          // console.log("redirect to: ", redirectUrl); // uncommment to see logs!
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setResponseData(null);
    setErrorMessage('');
    try {
      const response = await axios.post(API_URL.LOGIN, {
        email: formData.email,
        password: formData.password,
      });
      console.log('api response: ', response.data); // uncommment to see logs!
      if (response.data.authenticationResult.accessToken == null) {
        setErrorMessage('Wrong password. Try again or contact us to reset it.');
      } else {
        const token = response.data.authenticationResult.accessToken;
        Cookies.set(ACCESS_TOKEN, token, { path: '/' });
        Cookies.set(
          REFRESH_TOKEN,
          response.data.authenticationResult.refreshToken,
          { path: '/' }
        );
        Cookies.set(ID_TOKEN, response.data.authenticationResult.idToken, {
          path: '/',
        });
        // setResponseData(response.data);

        console.log('redirect to: ', redirectUrl); // uncommment to see logs!
        login();
        navigate(redirectUrl);
      }
    } catch (err) {
      let errorMessage = 'Something went wrong';
      const error = err as AxiosError;
      console.log(`error when calling : ${API_URL.LOGIN}, error: `, error);
      const errorResponse: any = error.response;
      if (errorResponse) {
        const data: any = errorResponse.data;
        console.log('error response', data);
        if (data.message != null) {
          errorMessage = data.message;
        }
      }
      setErrorMessage(errorMessage);
      removeToken();
    }
  };

  return (
    <Container fluid className='bgimage vh-100'>
      <Row className='d-flex justify-content-center'>
        <div className='col-xl-5 col-lg-5 col-md-6 col-sm-8 col-xs-10 col-11  mt-5 p-5 bg-white rounded-edges shadow-sm'>
          <div className='App'></div>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <h1 className='text-dark text-serif text-center pb-3'>
              Welcome back
            </h1>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {errorMessage && (
              <div className='text-danger mr-2 d-inline-block py-3'>
                {errorMessage}
              </div>
            )}
            <br />
            <Row className='d-flex justify-content-between align-items-center'>
              <Col>
                <Link to='/register'>
                  <Button variant='secondary' className='btn-custom'>
                    Register
                  </Button>
                </Link>
              </Col>
              <Col className='d-flex justify-content-end'>
                <Button variant='primary' type='submit' className='btn-custom'>
                  Login
                </Button>
              </Col>
            </Row>
            <br />
            <Row className='d-flex justify-content-between align-items-center'>
              <Col className='d-flex justify-content-end'></Col>
              <GoogleButton
                className='btn-custom'
                onClick={getAuth}
              ></GoogleButton>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
