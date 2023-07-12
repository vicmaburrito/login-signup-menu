/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import { logout } from '../Redux/actions/LoginAction';
import './Navbar.css';

function CustomNavbar({ userName, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={(state) => handleStateChange(state)}
    >
      <ul className="navbar-nav">
        {userName ? (
          <>
            <li className="mb-5">
              <h2 className="color-1a75c3 p-0 m-0 outfit">Bienvenido,</h2>
              <h2 className="color-152062 p-0 m-0 outfit">{userName}</h2>
            </li>
            <li className="nav-item mt-5 d-flex">
              <i className="bi bi-person-circle color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none"
              >
                <h4 className="outfit color-152062 mx-2">Mis Datos</h4>
              </Link>
            </li>
            <li className="nav-item d-flex mt-3">
              <i className="bi bi-bank2 color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none"
              >
                <h4 className="outfit color-152062 mx-2">Mis inversiones</h4>
              </Link>
            </li>
            <li className="nav-item d-flex mt-3">
              <i className="bi bi-bar-chart color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h4 className="outfit color-152062 mx-2">Movimientos</h4>
              </Link>
            </li>
            <li className="nav-item d-flex mt-3">
              <i className="bi bi-tag color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h4 className="outfit color-152062 mx-2">Oportunidades</h4>
              </Link>
            </li>
            <li className="nav-item d-flex mt-3">
              <i className="bi bi-gear color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h4 className="outfit color-152062 mx-2">Configuración</h4>
              </Link>
            </li>
            <button type="button" className="btn text-white w-100 mt-5" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <li className="mb-5">
              <h2 className="color-1a75c3 p-0 m-0 outfit">Hola!</h2>
            </li>
            <li className="nav-item d-flex mt-2">
              <i className="bi bi-house color-152062" />
              <Link
                to="/"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h3 className="outfit color-152062 mx-2">Home</h3>
              </Link>
            </li>
            <li className="nav-item d-flex mt-2">
              <i className="bi bi-person-fill-up color-152062" />
              <Link
                to="/SignUp"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h3 className="outfit color-152062 mx-2">Regístrate</h3>
              </Link>
            </li>
            <li className="nav-item d-flex mt-2">
              <i className="bi bi-box-arrow-in-left color-152062" />
              <Link
                to="/Login"
                onClick={() => closeMenu()}
                className="text-decoration-none "
              >
                <h3 className="outfit color-152062 mx-2">Inicia sesión</h3>
              </Link>
            </li>
          </>
        )}
      </ul>
    </Menu>
  );
}

const mapStateToProps = (state) => ({
  userName: state.login.user && state.login.user.name,
});

export default connect(mapStateToProps, { logout })(CustomNavbar);
