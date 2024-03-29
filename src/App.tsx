import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Page/Layout";
import Login from "./Page/Login";
import Home from "./Page/Home";
import PrivacyPolicy from "./Page/PrivacyPolicy";
import JobSearch from "./Page/JobSearch";
import JobDetails from "./Page/JobDetails";
import UserProfile from "./Page/UserProfile";
import RegisterAccount from "./Page/Register";
import React from "react";
import { AuthProvider } from './Auth/AuthContext';
import "./App.css";
import RequireAuth from "./Components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/job", element: <JobSearch /> },
      { path: "/job/:jobId", element: <JobDetails /> },
      // { path: "/profile", element: <UserProfile /> },
      { path: "/profile", element: <RequireAuth component={UserProfile} /> },
      { path: "/register", element: <RegisterAccount /> },
      { path: "/login", element: <Login /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> }
      //{ path: "/registrationConfirm", element: <RegistrationConfirm /> },
    ],
  },
]);

function App() {
  return (<AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  )
}

export default App;
