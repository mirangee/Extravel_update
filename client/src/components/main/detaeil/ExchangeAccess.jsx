import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Styles from '../../../scss/ExchangeAccess.module.scss';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { width } from '@mui/system';
import {
  API_BASE_URL as BASE,
  USER,
} from '../../../config/host-config';
import axios from 'axios';

const ExchangeAccess = ({ data, close }) => {
  const SEND_ONE_URL = BASE + USER + '/access';
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [numErr, setNumErr] = useState(false);
  const [code, setCode] = useState('');
  const [randomCode, setRandomCode] = useState(
    '789746516565464',
  );
  const [errMsg, setErrorMsg] =
    useState('-없이 입력해주세요.');
  const timer = useRef();
  // 인증 시간
  const initialTime = 180;
  const [remainingTime, setRemainingTime] =
    useState(initialTime);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const sendSMS = async (phoneNumber) => {
    try {
      const res = await axios.post(SEND_ONE_URL, {
        phoneNumber,
      });
      if (res && res.data) {
        console.log('발송 성공!!! : ', phoneNumber);
        const saveRandomCode = res.data;
        setRandomCode(saveRandomCode);
        console.log('randomCode: ', saveRandomCode);
        alert('인증번호가 발송되었습니다.');
      } else {
        console.error(
          '서버 응답이 유효하지 않습니다:',
          res,
        );
        alert('서버 응답이 유효하지 않습니다.');
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };
  const checkSMS = () => {
    if (code === '') {
      setErrorMsg('인증번호를 입력하세요.');
      return;
    }
    if (remainingTime === 0) {
      setErrorMsg('시간이 초과되었습니다.');
      return;
    }
    handleButtonClick();
  };

  const handleResendClick = () => {
    setRemainingTime(initialTime);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  const getAccessNum = () => {
    if (phoneNum === '') {
      setNumErr(true);
      setErrorMsg('전화 번호를 입력하세요.');
      return;
    } else if (numErr) {
      return;
    }
    const email = localStorage.getItem('EMAIL');
    const data = {
      email,
      phoneNum,
    };
    const vaild = async () => {
      const response = await axios.post(
        `http://localhost:8181/user/auth/exchange/check`,
        data,
      );
      const result = response.data;
      console.log(result);
      if (result === 200) {
        setAccess(true);
        sendSMS(phoneNum);
        setErrorMsg('');
      } else {
        setNumErr(true);
        setErrorMsg('본인명의 전화번호를 입력해주세요.');
      }
    };
    vaild();
  };
  useEffect(() => {
    const time = setInterval(() => {
      // 남은 시간이 0보다 크면 1초씩 감소시킴.
      if (remainingTime > 0 && access) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        // 남은 시간이 0이 되면 타이머 정지.
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, [remainingTime, access]);

  const handleButtonClick = () => {
    if (!loading && +code === +randomCode) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setErrorMsg('');
      }, 2000);
    } else if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
        setErrorMsg('인증 번호가 일치하지 않습니다.');
      }, 2000);
    }
  };
  const phoneNumHandler = (e) => {
    const value = e.target.value;
    setPhoneNum(value);
    if (/^[0-9]*$/.test(value)) {
      setNumErr(false);
      setErrorMsg('-없이 입력해주세요.');
    } else {
      setNumErr(true);
      setErrorMsg('전화번호는 숫자로만 입력하세요.');
    }
  };
  //환전하기
  const handleClick = () => {
    const send = {
      email: localStorage.getItem('EMAIL'),
      nation: data.nation,
      currencyCode: data.currencyCode,
      etp: data.etp,
      to: data.to,
      exchangeRate: data.finalRate,
    };
    axios
      .post('http://localhost:8181/api/v2/exchange', send)
      .then((res) => {
        const result = res.data;
        if (result === 'success') {
          alert('환전이 완료되었습니다.');
        } else {
          alert('환전 실패.');
        }
        close();
      });
  };
  return (
    <div>
      <div className={Styles.title}>
        본인확인을 위해 휴대전화 인증을 진행합니다.
      </div>
      {!access && (
        <TextField
          error={numErr}
          value={phoneNum}
          onChange={phoneNumHandler}
          fullWidth
          label='휴대폰 번호'
          type='search'
          variant='outlined'
          helperText={errMsg}
        />
      )}
      {access && (
        <div className={Styles.accessBtBox}>
          <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id='filled-search'
            label='인증 번호'
            type='search'
            variant='filled'
            helperText={
              <p className={Styles.accessP}>{errMsg}</p>
            }
          />
          <Box sx={{ margin: '3px', position: 'relative' }}>
            <Button
              variant='contained'
              sx={buttonSx}
              disabled={loading}
              onClick={checkSMS}
              className={Styles.accessBt}
            >
              {success ? <CheckIcon /> : '입력'}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <div className={Styles.timer}>
            {!success && formatTime(remainingTime)}
          </div>
        </div>
      )}
      <div className={Styles.buttonBox}>
        {access ? (
          <div className={Styles.accessPhoneBox}>
            <Button
              disabled={success}
              variant='contained'
              className={Styles.redirectBt}
              onClick={handleResendClick}
            >
              재전송
            </Button>
            <Button
              disabled={!success}
              variant='contained'
              className={Styles.exchangeBt}
              onClick={handleClick}
            >
              환전하기
            </Button>
          </div>
        ) : (
          <Button
            disabled={success}
            variant='contained'
            className={Styles.exchangeBt}
            onClick={getAccessNum}
          >
            인증번호받기
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExchangeAccess;
