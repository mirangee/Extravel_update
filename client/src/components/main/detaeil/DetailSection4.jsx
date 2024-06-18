import React, { useEffect } from 'react';
import Styles from '../../../scss/DetailSection4.module.scss';
import axios from 'axios';
const DetailSection4 = () => {
  useEffect(() => {
    axios.get('http://localhost:8181/api/v1/videos');
  }, []);
  return <div className={Styles.box}></div>;
};

export default DetailSection4;
