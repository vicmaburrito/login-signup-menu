import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../Redux/actions/LoginAction';

// eslint-disable-next-line react/prop-types
const Login = ({ loginRequest, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginRequest(email, password);
  };

  return (
    <div className="d-flex align-items-center">
      <div className="container p-5">
        <h2 className="text-center mb-5 outfit">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control mb-4 outfit"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control mb-4 outfit"
              id="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Password"
              required
            />
          </div>
          {loading && <p>Loading...</p>}
          {error
          && (
          <p>
            Error:
            {error}
          </p>
          )}
          <button type="submit" className="btn btn-primary px-5">Login</button>
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
