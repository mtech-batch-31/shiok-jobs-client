import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import Cookies from "js-cookie";
import { Amplify } from '@aws-amplify/core';

Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-1_MB8MD8ix8',
    region: 'ap-southeast-1',
    userPoolWebClientId: '54cq161otkrf4pqnods75b2lcm'
  },
  oauth: {
    domain: 'shiok-jobs.auth.ap-southeast-1.amazoncognito.com',
    scope: ['openid', 'email', 'phone'],
    redirectSignIn: [`${window.location.origin}`],
    responseType: 'token'
  },
});

axios.interceptors.request.use(request => {

    const token = Cookies.get('XSRF-TOKEN');
    console.log("token")
    console.log(token)
    if (token) {
        request.headers['X-XSRF-TOKEN'] = token;
    }

    return request;
}, error => {
    return Promise.reject(error);
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
