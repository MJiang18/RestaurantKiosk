import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem('token') ? (
            <Component {...props} />
          ) : (
            <Route path='/' element={<Navigate replace to='/login' />} />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
