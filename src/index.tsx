import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import Cookies from "js-cookie";
// import  Amplify from "aws-amplify";
// import { Amplify } from '@aws-amplify/core';
// import awsConfig from './utilities/awsConfig';


// Amplify.configure({
//   Auth: {
//     userPoolId: 'ap-southeast-1_MB8MD8ix8',
//     region: 'ap-southeast-1',
//     userPoolWebCLientId: '54cq161otkrf4pqnods75b2lcm'
//   },
//   oauth: {
//     domain: 'shiok-jobs.auth.ap-southeast-1.amazoncognito.com',
//     scope: ['openid', 'email', 'phone'],
//     redirectSignIN: 'https://shiokjob-client-web',
//     responseType: 'token'
//   },
// });
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolClientId: '54cq161otkrf4pqnods75b2lcm',
//       userPoolId: 'ap-southeast-1_MB8MD8ix8',
//       loginWith: { // Optional
//         oauth: {
//           domain: 'shiok-jobs.auth.ap-southeast-1.amazoncognito.com',
//           scopes: ['openid email phone '],
//           redirectSignIn: ['http://localhost:3000/','https://shiokjob-client-web'],
//           redirectSignOut: ['http://localhost:3000/','https://shiokjob-client-web'],
//           responseType: 'token',  
//         }
//       }
//     }
//   }
// });
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
