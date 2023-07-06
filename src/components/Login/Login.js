import React from 'react';

function Login() {
  return (
    <div className="mt-5 d-flex align-items-center">
      <div className="container px-5">
        <h2 className="text-center mb-5 outfit">Login</h2>
        <form>
          <div className="form-group">
            <input type="text" className="form-control mb-4 outfit" id="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <input type="email" className="form-control mb-4 outfit" id="email" placeholder="Email" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
