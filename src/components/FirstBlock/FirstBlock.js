import React, { useState, useEffect, useRef } from 'react';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';
import { connect } from 'react-redux';
import { logout } from '../Redux/actions/LoginAction';
import './FirstBlock.css';

// eslint-disable-next-line react/prop-types
function FirstBlock({ userName, logout }) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: myRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0xf7f7f7,
          midtoneColor: 0x000000,
          lowlightColor: 0xfffff,
          baseColor: 0xf7f7f7,
          blurFactor: 0.28,
          speed: 2.90,
          zoom: 1.80,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <section className="masthead d-flex align-items-center" ref={myRef}>
      <div className="container px-4 px-lg-5 text-center scale-down-center">
        <h1 className="mb-1 display-4 outfit color-152062">Auth Application</h1>
        <>
          {userName ? (
            <>
              <h3 className="mb-5 outfit color-152062">
                <em>
                  Bienvenido(a),
                  {userName}
                  !
                </em>
              </h3>
              <button type="button" className="btn text-white" onClick={handleLogout}>Logout</button>
            </>
          ) : null}
        </>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  userName: state.login.user && state.login.user.name,
});

export default connect(mapStateToProps, { logout })(FirstBlock);
