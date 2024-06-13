import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import naverCircle from '../../assets/img/naver_circle.png';
import kakaoCircle from '../../assets/img/kakao_circle.png';
import googleCircle from '../../assets/img/google_circle.png';

import styles from '../../scss/Login.module.scss';
import check from './Check.jsx';

const Login = () => {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사를 수행합니다.
  });

  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  // 폼이 제출되었을 때 호출되는 함수
  const onSubmit = (data) => console.log(data);

  // 'isRightPanelActive' 상태는 패널이 활성화되어 있는지 체크
  const [isRightPanelActive, setIsRightPanelActive] =
    useState(false);

  // 'Sign Up' 버튼 클릭 시 호출되는 함수
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };
  // 'Sign In' 버튼 클릭 시 호출되는 함수
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  // watch를 사용해 password 필드의 값을 추적
  const passwordValue = watch('password');
  return (
    <div className={styles.login}>
      <h2>EXTRAVEL LOGIN</h2>

      <div
        className={`${styles.container} ${isRightPanelActive ? styles['right-panel-active'] : ''}`}
      >
        <div className={styles.container}>
          <div
            className={`${styles['form-container']} ${styles['sign-up-container']}`}
          >
            {/* 회원가입 화면 */}
            <form
              className={styles.form}
              action='#'
              onSubmit={handleSubmit(onSubmit)}
            >
              <button
                className={styles.backButton}
                onClick={onClickBtn}
              >
                X
              </button>
              <h1>회원가입 하기</h1>
              <div className={styles['social-container']}>
                {/* 소셜 아이콘 (네이버, 카카오, 구글) */}
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={naverCircle}
                  />
                </a>
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={kakaoCircle}
                  />
                </a>
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={googleCircle}
                  />
                </a>
              </div>
              <span className={styles.span}>
                혹은 이메일을 사용하여 회원가입 하기
              </span>
              <Grid item>
                <Grid
                  container
                  direction={'column'}
                  spacing={1}
                >
                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='Name' // 컨트롤러의 이름
                      control={control} // useForm에서 제공하는 컨트롤 객체
                      defaultValue={''} // 초기 값
                      rules={{
                        required: '이름은 필수값 입니다.', // 필수 입력 필드
                        maxLength: {
                          value: 10,
                          message:
                            '이름은 10글자를 넘을 수 없습니다.',
                        },
                        pattern: {
                          value: /^[가-힣]+$/,
                          message:
                            '이름은 공백없이 한글만으로 작성해주세요',
                        },
                      }}
                      // 유효성 검사 규칙
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Name'
                          value={field.value} // 컨트롤러의 값
                          onChange={field.onChange} // 값이 변경될 때 호출되는 함수
                          error={
                            fieldState.error !== undefined // 오류 상태
                          }
                          helperText={
                            fieldState.error &&
                            fieldState.error.message // 오류 메시지
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/*
                  <Grid item style={{ width: '100%' }}> 
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Controller
                        name='country'
                        control={control}
                        defaultValue={''}
                        rules={{
                          required: '국적을 선택해 주세요.',
                        }}
                        render={({ field }) => (
                          <Select
                            label='Country'
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <MenuItem value='Korea'>
                              한국
                            </MenuItem>
                            <MenuItem value='Japan'>
                              일본
                            </MenuItem>
                            <MenuItem value='China'>
                              중국
                            </MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  */}

                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='phone'
                      defaultValue={''}
                      control={control}
                      rules={{
                        required:
                          '전화번호를 입력해주세요.',
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
                        <TextField
                          label='Phone Number'
                          value={field.value}
                          onChange={field.onChange}
                          error={
                            fieldState.error !== undefined
                          }
                          helperText={
                            fieldState.error &&
                            fieldState.error.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='email'
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                        minLength: {
                          value: 6,
                          message:
                            'Email must be at least 6 characters',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Email ID'
                          value={field.value}
                          onChange={field.onChange}
                          error={
                            fieldState.error !== undefined
                          }
                          helperText={
                            fieldState.error &&
                            fieldState.error.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='password'
                      defaultValue={''}
                      control={control}
                      rules={{
                        required: 'Password is required',
                        pattern: {
                          value:
                            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                          message:
                            '영문 숫자 특수기호 조합 8자리 이상',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Password'
                          type='password'
                          value={field.value}
                          onChange={field.onChange}
                          error={
                            fieldState.error !== undefined
                          }
                          helperText={
                            fieldState.error &&
                            fieldState.error.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='passwordConfirm'
                      defaultValue={''}
                      control={control}
                      rules={{
                        required:
                          'Password confirmation is required',
                        validate: (value) =>
                          value === passwordValue ||
                          'Passwords do not match',
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Confirm Password'
                          type='password'
                          value={field.value}
                          onChange={field.onChange}
                          error={
                            fieldState.error !== undefined
                          }
                          helperText={
                            fieldState.error &&
                            fieldState.error.message
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item style={{ width: '100%' }}>
                    <Button
                      type='submit'
                      variant='contained'
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* 로그인 화면 */}
          <div
            className={`${styles['form-container']} ${styles['sign-in-container']}`}
          >
            <form
              action='#'
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1>Sign in</h1>
              <div className={styles['social-container']}>
                {/* 소셜 로그인 아이콘 (네이버, 카카오, 구글) */}
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={naverCircle}
                  />
                </a>
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={kakaoCircle}
                  />
                </a>
                <a href='#' className={styles.social}>
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={googleCircle}
                  />
                </a>
              </div>
              <span className={styles.span}>
                혹은 이메일로 로그인하기
              </span>
              <input
                className={styles.input1}
                type='email'
                placeholder='Email'
              />
              <input
                className={styles.input1}
                type='password'
                placeholder='Password'
              />
              <a className={styles.a} href='#'>
                비밀번호를 잊으셨나요?
              </a>
              <button className={styles.button}>
                로그인
              </button>
            </form>
          </div>
          <div className={styles['overlay-container']}>
            <div className={styles.overlay}>
              <div
                className={`${styles['overlay-panel']} ${styles['overlay-left']}`}
              >
                <h1>EXTRAVEL 회원가입 하기</h1>
                <p>
                  To keep connected with us please login
                  with your personal info
                </p>
                <button
                  className={styles.ghost}
                  id='signIn'
                  onClick={handleSignInClick}
                >
                  로그인 하러 가기
                </button>
              </div>

              <div
                className={`${styles['overlay-panel']} ${styles['overlay-right']}`}
              >
                <button
                  className={styles.backButton}
                  onClick={onClickBtn}
                >
                  X
                </button>
                <h1>EXTRAVEL 로그인 하기</h1>
                <p>
                  Enter your personal details and start
                  journey with us
                </p>
                <button
                  className={styles.ghost}
                  id='signUp'
                  onClick={handleSignUpClick}
                >
                  회원가입 하러 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
