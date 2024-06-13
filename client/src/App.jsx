import Section1 from './components/main/intro/Section1';
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Section3 from './components/main/intro/Section3';
import Section2 from './components/main/intro/Section2';
import ScrollToTopButton from './components/main/ScrollToTopButton';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import { AuthContextProvider } from './utils/AuthContext';

const App = () => {
  return (
    <>
      <Router>
        <Header />
      </Router>
      <Section1>
        <AuthContextProvider>
          <div className='content-wrapper'>
            <Routes>
              <Route
                path='/oauth/kakao'
                element={<KakaoLoginHandler />}
              />
            </Routes>
          </div>
        </AuthContextProvider>
      </Section1>

      <Section2 />
      <Section3 />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default App;
