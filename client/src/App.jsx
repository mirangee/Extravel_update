import Section1 from './components/main/intro/Section1';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Section3 from './components/main/intro/Section3';
import Login from './components/user/Login';

const App = () => {
  return (
    <>
      <Login />
      {/* <Section1 />
      <Router>
        <Header />
      </Router>
      <Section1 />
      <Section3 /> */}
    </>
  );
};

export default App;
