import { Grid, TextField } from '@mui/material';
import styles from '../../scss/LoginPhoneNumber.module.scss';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import {
  API_BASE_URL as BASE,
  USER,
} from '../../config/host-config';
import { GiConfirmed } from 'react-icons/gi';
import AuthNumTimer from './AuthNumTimer';
import { Button } from 'reactstrap';

const LoginPhoneNumber = () => {
  const SEND_ONE_URL = BASE + USER + '/send-one';
  const [randomCode, setRandomCode] = useState(''); //인증값 상태
  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false); // 인증 완료 여부 상태
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
  const [showAuthNumTimer, setShowAuthNumTimer] =
    useState(false); //인증 일치 검증
  const [checkCode, setCheckCode] = useState(''); //사용자 입력 인증값
  const [isTimeZero, setIsTimeZero] = useState(false); //시간 0초 체크
  const [resultMsg, setResultMsg] = useState('');

  const { control: signUpControl } = useForm({
    mode: 'onChange',
  });

  // 번호 인증을 위한 SMS 전송
  const sendSMS = async (phoneNumber) => {
    console.log('로그인 phoneNumber : ', phoneNumber);
    try {
      if (!phoneNumber || phoneNumber.length === 0) {
        alert('전화번호를 입력해주세요');
        setShowAuthNumTimer(false);
        return;
      }

      const res = await axios.post(SEND_ONE_URL, {
        phoneNumber,
      });
      if (res && res.data) {
        console.log('발송 성공!!! : ', phoneNumber);
        const saveRandomCode = res.data;
        console.log('randomCode: ', saveRandomCode);
        setRandomCode(saveRandomCode);
        alert('인증번호가 발송되었습니다.');
        setShowAuthNumTimer(true);
      } else {
        console.error(
          '서버 응답이 유효하지 않습니다:',
          res,
        );
        alert('서버 응답이 유효하지 않습니다.');
        setShowAuthNumTimer(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      setShowAuthNumTimer(false);
    }
  };

  const handleTimeZero = (isZero) => {
    setIsTimeZero(isZero);
    if (isZero) {
      setRandomCode(''); // 타이머가 0이면 인증 코드를 무효화
    }
  };

  // 인증번호 확인
  const checkSMS = (checkCode) => {
    const checkCodeStr = checkCode.toString();
    console.log('checkCodeStr는???', checkCodeStr);
    console.log('randomCode는???', randomCode);
    let msg;
    if (checkCodeStr === '') {
      alert('값을 입력해주세요.');
    }
    if (+checkCodeStr === +randomCode) {
      msg = '휴대폰 인증이 정상적으로 완료되었습니다.';
      setIsAuthCompleted(true);
    } else {
      msg = '인증번호가 올바르지 않습니다.';
      setIsAuthCompleted(false);
    }
    setResultMsg(msg);
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.toplogo}>EXTRAVEL</h2>

      <div className={`${styles['form-container']}`}>
        <div className={styles.phoneCertification}>
          <h2>전화번호 인증하기</h2>
        </div>

        <Grid item style={{ width: '100%' }}>
          {/* 전화번호 입력 및 SMS 전송 */}
          <Controller
            name='phoneNumber'
            defaultValue={''}
            disabled={isAuthCompleted}
            control={signUpControl}
            rules={{
              required: '전화번호를 입력해주세요.',
              pattern: {
                value: /^[0-9]*$/,
                message: '숫자만 입력해주세요.',
              },
              maxLength: {
                value: 11,
                message:
                  '전화번호는 11자리를 넘을 수 없습니다.',
              },
            }}
            render={({ field, fieldState }) => (
              <div className={styles.textButton}>
                <TextField
                  className={styles.textField}
                  label='Phone Number'
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
                <GiConfirmed
                  onClick={(e) => {
                    e.preventDefault();
                    setPhoneNumber(field.value);
                    sendSMS(field.value); // 전화번호로 SMS 전송
                  }}
                  variant='contained'
                  className={styles.phoneNumberCheck}
                />
              </div>
            )}
          />
        </Grid>

        {/* 인증번호 입력 및 확인 */}
        {showAuthNumTimer && (
          <>
            <Grid item className={styles.grid}>
              <TextField
                className={styles.certifiedNumberTextField}
                fullWidth
                variant='outlined'
                label='인증번호'
                value={checkCode}
                onChange={(e) =>
                  setCheckCode(e.target.value)
                }
                disabled={isAuthCompleted} // 인증 완료 시 비활성화
              />
              <Button
                className={styles.certificationButton}
                onClick={(e) => {
                  e.preventDefault();

                  if (!isTimeZero) {
                    checkSMS(checkCode); // 입력된 인증코드 검증
                  } else {
                    setResultMsg(
                      '인증 시간이 만료되었습니다. 재전송 버튼을 눌러 다시 시도하세요.',
                    );
                  }
                }}
                variant='contained'
                color='success'
                style={{
                  marginTop: 10,
                  display: !isAuthCompleted
                    ? 'block'
                    : 'none',
                }}
              >
                인증하기
              </Button>

              <div
                style={{
                  color: resultMsg.includes(
                    '올바르지 않습니다.',
                  )
                    ? 'red'
                    : 'green',
                }}
              >
                {resultMsg}
              </div>
            </Grid>
            {showAuthNumTimer && !isAuthCompleted && (
              <AuthNumTimer
                onTimeZero={handleTimeZero} //@@@ 타이머가 0이 되었을 때 호출될 콜백 함수
                sendSMS={sendSMS}
                phoneNumber={phoneNumber}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPhoneNumber;
