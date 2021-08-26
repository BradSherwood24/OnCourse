import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import '../Navbar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    window.location = '/login'
  };

  return <button className='logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
