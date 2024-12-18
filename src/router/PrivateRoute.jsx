import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    // If the user is authenticated, render the child components
    if (user) {
        return children;
    }

    // If the user is not authenticated, navigate to the sign-in page
    return (
        <Navigate to='/signIn' state={{ from: location }} replace />
    );
};

export default PrivateRoute;
