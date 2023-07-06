import React from 'react';

function Login() {
  return (
    <div className="d-flex align-items-center">
      <div className="container p-5">
        <h2 className="text-center mb-5 outfit">Login</h2>
        <form>
          <div className="form-group">
            <input type="text" className="form-control mb-4 outfit" id="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <input type="email" className="form-control mb-4 outfit" id="email" placeholder="Email" />
          </div>
          <div className="text-center mb-3">
            <button type="submit" className="btn btn-primary px-5">Submit</button>
          </div>
          <div className="text-center">
            <p className="text-muted">or sign up with:</p>
            <button type="button" className="btn btn-secondary mx-1">
              <i className="bi bi-facebook" />
            </button>
            <button type="button" className="btn btn-secondary mx-1">
              <i className="bi bi-google" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
