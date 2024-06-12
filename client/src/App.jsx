import Section1 from './components/main/intro/Section1';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Section3 from './components/main/intro/Section3';
import Login from './components/user/Login';

const App = () => {
  return (
    <>
      <Section1 />
      <Router>
        <Header />
      </Router>
        <Section3 />
      {/* <Footer /> */}
    </>
  );
};

export default App;
