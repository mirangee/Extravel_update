import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Header />
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
