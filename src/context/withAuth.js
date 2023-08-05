// MyAuthenticatedComponent.js
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    // Authentication logic here
    const isAuthenticated = Boolean(Cookies.get("token"))

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return WithAuth;
};

export default withAuth;
