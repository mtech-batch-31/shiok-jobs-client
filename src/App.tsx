import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './page/Layout';
import Login from './page/Login';
import Price from './page/Price'
import Home from './page/Home'
import SubmitRequest  from './page/SubmitRequest';
import RegisterAccount from './page/Register'
import RegistrationConfirm from './page/RegisterationConfirm'
import { isLogin } from './utilities/auth'
import React from "react"


import './App.css';

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />,
    children: [
      { index: true, element: <Home />},
      { path: "/register", element: <RegisterAccount />},
      { path: "/home", element: <Home />},
      { path: "/login", element: <Login />},
      { path: "/price", element: <Price />, loader: isLogin},
      { path: "/submitRequest", element: <SubmitRequest />, loader: isLogin},
      { path: "/registrationConfirm", element: <RegistrationConfirm />},
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;
