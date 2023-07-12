import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../Redux/actions/LoginAction';
import AuthApps from '../shared/AuthApps';
import './Login.css';

// eslint-disable-next-line react/prop-types
const Login = ({ loginRequest, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginRequest(email, password);
    navigate('/', { replace: true });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex align-items-center">
      <div className="container p-5">
        <h2 className="text-center mb-5 outfit color-152062">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <span className="px-1 color-152062">Email</span>
            <div className="input-group">
              <input
                type="email"
                className="input-form-auth form-control outfit border-color"
                id="email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
              <span className="input-group-text input-form-auth" id="password">
                <i className="bi bi-envelope-open-fill" />
              </span>
            </div>
          </div>
          <div className="form-group">
            <span className="px-1 color-152062">Contraseña</span>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-form-auth form-control outfit"
                id="password"
                value={password}
                onChange={handleChangePassword}
                required
              />
              <button
                type="button"
                className="input-group-text input-form-auth"
                id="password"
                onClick={toggleShowPassword}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
              </button>
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {error
          && (
          <p>
            Error:
            {error}
          </p>
          )}
          <div className="d-flex justify-content-center mt-5">
            <button type="submit" className="btn btn-default-style text-white login-btn px-5">Iniciar sesión</button>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Link
              to="/SignUp"
              className="text-decoration-none "
            >
              <span className="outfit color-1a75c3 link-signup">CREAR CUENTA</span>
            </Link>
          </div>
          <div className="form-check d-flex justify-content-center mt-5">
            <input className="form-check-input me-2" type="checkbox" value="" id="sesion" />
            <p className="text-muted">
              Mantener sesión iniciada
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <p className="text-muted"> Ó registrate con: </p>
          </div>
          <AuthApps />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  error: state.login.error,
});

export default connect(mapStateToProps, { loginRequest })(Login);
