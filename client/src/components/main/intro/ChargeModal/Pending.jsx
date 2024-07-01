import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Pending = () => {
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <div
        style={{
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '300px',
        }}
      >
        결제 진행 중입니다. 잠시만 기다려 주세요.
      </div>
    </>
  );
};

export default Pending;
