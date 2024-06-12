import Section1 from './components/main/intro/Section1';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Section3 from './components/main/intro/Section3';

const App = () => {
  return (
    <>
      <Router>
        <Header />
      </Router>
      <Section1 />
      <Section3 />
      <Footer />
    </>
  );
};

export default App;
