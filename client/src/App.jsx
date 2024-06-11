import Section1 from './components/main/intro/Section1';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Section1 />
      <Router>
        <Header />
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
