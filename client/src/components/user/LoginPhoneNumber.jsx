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

const LoginPhoneNumber = () => {
  const SEND_ONE_URL = BASE + USER + '/send-one';
  const [randomCode, setRandomCode] = useState(''); //인증값 상태
  const [isRightPanelActive, setIsRightPanelActive] =
    useState(false);
  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false); // 인증 완료 여부 상태
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
  const [showAuthNumTimer, setShowAuthNumTimer] =
    useState(false); //인증 일치 검증
  const {
    control: signUpControl, //control 名 설정
    handleSubmit: onSubmitSignUp,
    watch,
    formState: {
      isSubmitSuccessful: isSignUpSuccessful,
      errors: signUpErrors,
    },
    register: signUpRegister,
  } = useForm({
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사를 수행
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

  return (
    <div className={styles.login}>
      <h2 className={styles.toplogo}>EXTRAVEL</h2>

      <div
        className={`${styles.container} ${isRightPanelActive ? styles['right-panel-active'] : ''}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles['form-container']} ${styles['sign-up-container']}`}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPhoneNumber;
