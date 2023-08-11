import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';
import { useState } from 'react';
const LoginLogoutFunctions = () => {
  const navigate = useNavigate('/');
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );
      const { data } = await axios.post(
        'https://offer-generator-backend.onrender.com/auth',
        { email: res.data.email }
      );
      let userData = data && data.email ? data : res.data;
      localStorage.setItem('userdata', JSON.stringify(userData));
      // if (!userData.verified) {
      //     localStorage.setItem("redirectUrl",window.location.href);
      //     navigate('/verify');
      // }
      // else
      window.location.reload();
    },
  });
  const logout = () => {
    localStorage.removeItem('userdata');
    window.location.reload();
  };
  return { login, logout };
};

export default LoginLogoutFunctions;
