import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef(null); // Reference to the header

  // Adjust the top style of the menu based on the header height
  useEffect(() => {
    const updateMenuPosition = () => {
      const menu = document.querySelector('.menu');
      if (menu && headerRef.current) {
        menu.style.top = `${headerRef.current.offsetHeight}px`;
      }
    };

    updateMenuPosition(); // Call when component mounts
    window.addEventListener('resize', updateMenuPosition); // Adjust on resize
    return () => window.removeEventListener('resize', updateMenuPosition);
  }, []);


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
      <div className="header" ref={headerRef}>
        <div className="logo-title">
          <Logo />
          <h1 className="title">Federation Demo</h1>
          <br />
        </div>
        <button type="button" className="menu-button" onClick={() => setIsOpen(!isOpen)}>
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
