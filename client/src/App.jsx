import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/main/ScrollToTopButton';
import Login from './components/user/Login';
import MainIntro from './components/main/intro/MainIntro';
import GoogleLoginHandler from './components/user/GoogleLoginHandler';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainIntro />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
      <GoogleLoginHandler />
    </>
  );
};

export default App;
