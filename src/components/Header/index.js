import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../assets/Header.css';

const Header = () => {
  const { ui }  = useSelector(state => state);

  const { showLogo } = ui;

  return (
    <header className="header">
      {showLogo && <h1>LOGO</h1>}
      <hr />
      <NavLink to="/" className="headerLink">Home</NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/auth" className="headerLink">Signup</NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/profile" className="headerLink">Profile</NavLink>
    </header>
  )
}

export default Header
