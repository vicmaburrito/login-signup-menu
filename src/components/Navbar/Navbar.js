import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css';

export default function CustomNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={(state) => handleStateChange(state)}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/"
            onClick={() => closeMenu()}
            className="text-decoration-none"
          >
            <h3 className="text-dark">Home</h3>
          </Link>
        </li>
      </ul>
    </Menu>
  );
}
