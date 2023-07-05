import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomNavbar from '../Navbar/Navbar';
import SignUp from '../SignUp/signUp';
import Login from '../Login/Login';
import FirstBlock from '../FirstBlock/FirstBlock';

function Home() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<FirstBlock />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Home;
