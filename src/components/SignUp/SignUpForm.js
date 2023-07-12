import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/firebase-config';
import './SignUp.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [rfc, setRfc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setlastName(event.target.value);
  };

  const handleChangeRfc = (event) => {
    setRfc(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePass = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmailRx = /^\w+([.-]?\w+)*@(gmail|outlook|hotmail|yahoo)\.(com|co|es)$/.test(email);
    if (validateEmailRx) {
      try {
        await addDoc(collection(db, 'users'), { email, name, password });
        setModalTitle('Hola, Bienvenido!');
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
    navigate('/', { replace: true });
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} contentClassName="modal-small">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default-style text-white" onClick={hideModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex align-items-center">
        <div className="container p-5">
          <h2 className="text-center mb-5 outfit color-152062">Regístrate</h2>
          <form>
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type="text"
                  value={name}
                  onChange={handleChangeName}
                  className="input-form-auth form-control outfit"
                  id="name"
                  placeholder="Nombre(s)"
                  required
                />
                <span className="input-group-text input-form-auth" id="name">
                  <i className="bi bi-person-circle" />
                </span>
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type="text"
                  value={lastName}
                  onChange={handleChangeLastName}
                  className="input-form-auth form-control outfit"
                  id="apellidos"
                  placeholder="Apellidos"
                />
                <span className="input-group-text input-form-auth" id="apellidos">
                  <i className="bi bi-person-circle" />
                </span>
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type="text"
                  value={rfc}
                  onChange={handleChangeRfc}
                  className="input-form-auth form-control outfit"
                  id="rfc"
                  placeholder="RFC"
                />
                <span className="input-group-text input-form-auth" id="rfc">
                  <i className="bi bi-person-vcard-fill" />
                </span>
              </div>
              <div className="d-flex justify-content-end">
                <span className="rfc-info-text text-muted outfit">
                  ¿No sabes tu RFC? Consúltalo&nbsp;
                  <a
                    href="https://www.sat.gob.mx/aplicacion/operacion/31274/consulta-tu-clave-de-rfc-mediante-curp"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Aquí
                  </a>
                </span>
              </div>
            </div>
            <span className="outfit">Nacionalidad</span>
            <div className="row mt-2 mb-4">
              <div className="col-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input className="form-check-input" type="checkbox" id="mexicana" />
                  <span className="text-muted outfit">Mexicana</span>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input className="form-check-input" type="checkbox" id="extranjera" />
                  <span className="text-muted outfit">Extranjera</span>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type="email"
                  className="input-form-auth form-control outfit border-color"
                  id="email"
                  value={email}
                  placeholder="Correo Electrónico"
                  onChange={handleChangeEmail}
                  required
                />
                <span className="input-group-text input-form-auth" id="email">
                  <i className="bi bi-envelope-open-fill" />
                </span>
              </div>
              {!isValidEmail && (
                <p className="text-danger mt-2 outfit">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChangePass}
                  className="input-form-auth form-control outfit"
                  id="password"
                  placeholder="Contraseña"
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
            <div className="form-group mb-4">
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-form-auth form-control outfit"
                  id="password"
                  placeholder="Confirmar contraseña"
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
            <div className="form-check d-flex justify-content-center">
              <input className="form-check-input px-2" type="checkbox" id="mexicana" />
              <p className="mx-1 rfc-info-text text-muted outfit">
                Estoy de acuerdo con los&nbsp;
                <a href="#terminos" className="color-1a75c3">
                  Términos y condiciones
                </a>
                &nbsp;y con el
                tratamiento de mis datos personlaes según el&nbsp;
                <a href="#aviso" className="color-1a75c3">
                  Aviso de Privacidad
                </a>
              </p>
            </div>
            <div className="text-center mb-3">
              <button type="submit" onClick={handleSubmit} className="btn btn-default-style text-white login-btn px-5">
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
