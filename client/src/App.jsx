// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
// import ExchangeRateNews from './components/Slider';
import Slider from './components/Slider';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Slider />
      </Router>
    </>
  );
};

export default App;
