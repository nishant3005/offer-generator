import React from 'react';
import NavbarItem from './NavbarItem';
import classes from './Navbar.module.css';
import logo from '../../../assets/Icon-notepad.png';
import logFunc from '../Login/LoginLogoutFunc';

const Navbar = (props) => {
  const { login, logout } = logFunc();

  function logoutHandler() {
    logout();
  }
  return (
    <div className={`${classes.list}`}>
      <div className={`${classes.left}`}>
        <img src={logo} alt="logo" className={`${classes.logo}`} />
        <NavbarItem item="offer-generator" link="/" />
      </div>
      <div className={`${classes.right}`}>
        <NavbarItem item="Home" link="/" />
        <NavbarItem item="Profile" link="/profile" />
        {props.user ? (
          <NavbarItem item="Logout" onLogout={logoutHandler} />
        ) : (
          <NavbarItem item="Login" link="/login" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
