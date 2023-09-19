import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Page/Layout';
import Login from './Page/Login';
import Home from './Page/Home'
import RegisterAccount from './Page/Register'
import RegistrationConfirm from './Page/RegisterationConfirm'
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
      { path: "/registrationConfirm", element: <RegistrationConfirm />},
    ],
  },
]);

function App() {
  return (<RouterProvider router={router} />
  );
}

export default App;
