import React, { ComponentType, FC } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Navigate, useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { ACCESS_TOKEN } from '../utilities/constants';

const RequireAuth: FC<{ component: ComponentType<any> }> = ({ component: Component }) => {
  // const location = useLocation();

  // if (!Cookies.get(ACCESS_TOKEN)) {
  //   return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  // }

  return <Component />;
};

export default RequireAuth;
