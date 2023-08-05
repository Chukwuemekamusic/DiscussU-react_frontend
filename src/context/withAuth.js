// MyAuthenticatedComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    // Authentication logic here
    const isAuthenticated = Boolean(Cookies.get("token"))
    const navigate = useNavigate();

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      navigate("/login");
      return null;
    }
  };

  return WithAuth;
};

export default withAuth;
