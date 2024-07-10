import React, { useEffect } from 'react';
import Styles from '../../../scss/DetailSection4.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/host-config';
const DetailSection4 = () => {
  useEffect(() => {
    axios.get({ API_BASE_URL } + '/api/v1/videos');
  }, []);
  return <div className={Styles.box}></div>;
};

export default DetailSection4;
