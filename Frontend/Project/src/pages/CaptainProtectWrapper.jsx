import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// function created and check the children
const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // useEffect to handle side effects like navigation
  useEffect(() => {
    if (!token) {
      navigate('/captainlogin'); // Redirect if no token is found
    }
  }, [token, navigate]); // Dependencies: token and navigate

  return <>{children}</>;
};

export default CaptainProtectWrapper;
