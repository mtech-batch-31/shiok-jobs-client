import './styles/Login.css';

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import * as jose from 'jose';
import {Buffer} from 'buffer';
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
import { JSEncrypt } from 'jsencrypt';

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
  const OAUTH_CODE_VERIFIER = 'react-use-oauth2-code-verifier';
  const OAUTH_REDIRECT_URL = API_URL.REDIRECT_URL_PROD;
  const { logout } = useAuth();
  const USER_POOL_ID = 'ap-southeast-1_MB8MD8ix8';
  const REGION = 'ap-southeast-1';
  const cachedJwks: any = [];

  const saveState = (state: string) => {
    sessionStorage.setItem(OAUTH_STATE_KEY, state);
  };

  const removeState = () => {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
  };

  // GENERATING CODE VERIFIER
  function dec2hex(dec: any) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  function generateRandomVValue() {
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
    console.log("codeChallenge: ", base64encoded);
    return base64encoded;
  }

  function randomString(length: any) {
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/'
    let result = ''

    while (length > 0) {
        var bytes = new Uint8Array(16);
        var random = window.crypto.getRandomValues(bytes);

        random.forEach(function(c) {
            if (length == 0) {
                return;
            }
            if (c < charset.length) {
                result += charset[c];
                length--;
            }
        });
    }
    return result;
}


/**
 * @description get cognito JWKS and cache the result. If kid is no found refresh cache.
 * @param {string} currentKid - current kid to double check cache or refresh.
 */
const getJwk = async (currentKid:any) => {
    if (currentKid) {
        console.log('-----> cachedJwks', cachedJwks)
        const cachedKey = cachedJwks.find((item:any) => item.kid === currentKid)
        if (cachedKey) {
            console.log('-----> cachedKey', cachedKey)
            return cachedKey
        }
        cachedJwks.length = 0

        const { data } = await axios.get(`https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`)
            .catch(error => {
                console.error('Error on getJwk axios call', error)
                return { data: null }
            })
        if (data?.keys) {
            // console.log('-----> data call')
            const key = data.keys.find((item:any) => item.kid === currentKid)
            if (key) {
                cachedJwks.push(...data.keys)
                return key
            }
        }
    }
    console.error('No Key found to verify the token: ', currentKid)
    return null
}

const verifyToken = async (response:any) => {
  try {
      // get header using jose get protected header method.
      const header = jose.decodeProtectedHeader(response.data.id_token)
      const jwk = await getJwk(header.kid)
      if (jwk) {
        (async () => {
          const pem = await jose.importJWK(jwk, 'RS256')
          const { payload: verifiedBufferData } = await jose.compactVerify(response.data.id_token, pem)
          const verifiedData = JSON.parse(Buffer.from(verifiedBufferData).toString('utf8'))
          console.log("verfied token inside " + JSON.stringify(verifiedData));
          let storedNonce = sessionStorage.getItem('nonce');
          if (verifiedData.nonce !== storedNonce) {
              console.log("nonce mismatch: ", storedNonce, " ", verifiedData.nonce);
              sessionStorage.clear();
              logout();
              return;
          }
           else {
            const token = response.data.access_token;
            Cookies.set(ACCESS_TOKEN, token, { path: '/' });
            Cookies.set(REFRESH_TOKEN, response.data.refresh_token, {
              path: '/',
            });
            Cookies.set(ID_TOKEN, response.data.id_token, { path: '/' });
            console.log('refresh token ' + response.data.refresh_token);
            console.log('id token ' + response.data.id_token);
  
            // console.log("redirect to: ", redirectUrl); // uncommment to see logs!
            login();
            navigate(redirectUrl);
            sessionStorage.removeItem(OAUTH_CODE_VERIFIER);
            removeState();
           }
          // return verifiedData;
        })();
      }
  } catch (error) {
      console.error('Error on verifyToken', error)
  }
  return null
}

  const getAuth = useCallback(() => {
    // 1. Generate and save state
    
    const authorizeState = generateRandomVValue();
    console.log("state: ", authorizeState);
    saveState(authorizeState);
    const codeVerifier = generateRandomVValue();
    console.log("codeVerifier: ", codeVerifier);
    sessionStorage.setItem(OAUTH_CODE_VERIFIER, codeVerifier);
    const nonce = randomString(16);
    sessionStorage.setItem('nonce', nonce);
    let code_challenge = null;
    (async () => {
      code_challenge = await generateCodeChallengeFromVerifier(
        sessionStorage.getItem(OAUTH_CODE_VERIFIER)
      );
      window.location.href = `https://shiok-jobs.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=5i5fgd57n42nmala1b7ahmfsl0&redirect_uri=${OAUTH_REDIRECT_URL}/login&state=${authorizeState}&scope=openid+email+phone+aws.cognito.signin.user.admin&identity_provider=Google&code_challenge_method=S256&code_challenge=${code_challenge}&nonce=${nonce}`;
    })();
  }, []);

  useEffect(() => {
    // getUser();
    if (Cookies.get(ACCESS_TOKEN)) {
      // setIsLoggedIn(true);
    }

    if (code == null){
      return;
    }
    const storedState = sessionStorage.getItem(OAUTH_STATE_KEY);
    if (tokenState !== storedState) {
        console.error("state mismatch: ", tokenState, " ", storedState);
        sessionStorage.clear();
        return;
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
        redirect_uri: `${OAUTH_REDIRECT_URL}/login`,
        client_id: '5i5fgd57n42nmala1b7ahmfsl0',
        code: code,
        code_verifier: sessionStorage.getItem(OAUTH_CODE_VERIFIER),
        scope: 'phone email openid aws.cognito.signin.user.admin',
      },
    };
    // console.log(config);

    axiosInstance(config)
      .then((response) => {
        if (response.status === 200) {
          verifyToken(response);
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
  function encrypt(plaintext: string) {
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
    setErrorMessage('');
    try {
      const response = await axios.post(API_URL.SIGIN, {
        email: formData.email,
        password: encrypt(formData.password),
      });
      console.log('api response: ', response.data); // uncommment to see logs!
      if (response.data.authenticationResult.accessToken == null) {
        setErrorMessage('Wrong password. Try again or contact us to reset it.');
      } else {
        const token = response.data.authenticationResult.accessToken;
        Cookies.set(ACCESS_TOKEN, token, { path: '/' });
        console.log('test normal login dont store accessToken ');
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
              {/* <button onClick={() => federatedSignInUpdateUser()}>Open Google</button> */}
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
