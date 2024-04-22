import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from './Logo';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Build Time Module Federation', to: 'app1' },
    { label: 'Dynamic Module Federation', to: 'app2' },
    { label: 'Dynamic SystemJS', to: 'app3' },
    { label: 'Dynamic SystemJS (App 2)', to: 'app4' },
    { label: 'Angular Dynamic Module Federation', to: 'angular-app1' },
    { label: 'Standalone (iFrame)', to: 'iframe' },
    { label: "Let's go nuts", to: 'nuts' },
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="logo-title">
          <Logo />
          <h1 className="title">Federation Demo</h1>
          <br />
        </div>
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          &#9776;
        </button>
      </div>
      <div className={`menu ${isOpen ? 'active' : ''}`}>
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
