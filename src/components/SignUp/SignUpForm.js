import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-bootstrap/Modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/firebase-config';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [setProfile] = useState(null);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePass = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmailRx = /^\w+([.-]?\w+)*@(gmail|outlook|hotmail|yahoo)\.(com|co|es)$/.test(email);
    if (validateEmailRx) {
      try {
        await addDoc(collection(db, 'users'), { email, name, password });
        setModalTitle('Welcome!');
        setModalBody(name);
        setIsValidEmail(true);
      } catch (e) {
        setIsValidEmail(false);
      }
      setShow(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const hideModal = () => {
    setShow(false);
    setEmail('');
    setName('');
    setPassword('');
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} contentClassName="modal-small">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex align-items-center">
        <div className="container p-5">
          <h2 className="text-center mb-5 outfit">Sign Up</h2>
          <form>
            <div className="form-group">
              <input type="text" value={name} onChange={handleChangeName} className="form-control mb-4 outfit" id="name" placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="email" value={email} onChange={handleChangeEmail} className="form-control mb-4 outfit" id="email" placeholder="Email" required />
              {!isValidEmail && (
                <p className="text-danger mt-2">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className="form-group">
              <input type="password" value={password} onChange={handleChangePass} className="form-control mb-4 outfit" id="password" placeholder="Password" required />
            </div>
            <div className="text-center mb-3">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary px-5">Submit</button>
            </div>
            <p className="text-muted text-center">or sign up with:</p>
            <div className="text-center d-flex justify-content-center">
              <div className="w-50">
                <LoginSocialFacebook
                  appId={process.env.FACEBOOK_APP_ID}
                  onResolve={(response) => {
                    setProfile(response.data);
                  }}
                  onReject={(error) => {
                    console.log(error);
                  }}
                >
                  <FacebookLoginButton />
                </LoginSocialFacebook>
              </div>
            </div>
            <div className="text-center d-flex justify-content-center">
              <div className="w-50">
                <LoginSocialGoogle
                  client_id={process.env.GOOGLE_CLIENT_ID}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ provider, data }) => {
                    console.log(provider, data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
