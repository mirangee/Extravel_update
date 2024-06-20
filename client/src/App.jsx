import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/main/ScrollToTopButton';

import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import { AuthContextProvider } from './utils/AuthContext';

import Login from './components/user/Login';
import MainIntro from './components/main/intro/MainIntro';
import MainDetail from './components/main/detaeil/MainDetail';
import NaverLoginHandler from './components/user/NaverLoginHandler';
import NaverNews from './components/main/detaeil/NaverNews';

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<MainIntro />} />
          <Route path='/main' element={<MainDetail />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/user/auth/naver'
            element={<NaverLoginHandler />}
          />
          <Route
            path='/oauth/kakao'
            element={<KakaoLoginHandler />}
          />
          <Route
            path='/main/news'
            element={<NaverNews />}
          ></Route>
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </AuthContextProvider>
    </>
  );
};

export default App;
