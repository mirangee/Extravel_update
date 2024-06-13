import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

const Login = () => {
  // const { register, handleSubmit } = useForm();
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);

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
            <form
              className={styles.form}
              action='#'
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1>Create Account</h1>
              <div className={styles['social-container']}>
                {/* 소셜 아이콘 (Facebook, Google, LinkedIn) */}
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
                or use your email for registration
              </span>
              <Grid item>
                <Grid
                  container
                  direction={'column'}
                  spacing={3}
                >
                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='Name'
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: 'First Name is required',
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
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Name'
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
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Controller
                        name='country'
                        control={control}
                        defaultValue={''}
                        rules={{
                          required: 'Country is required',
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

                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='phone'
                      defaultValue={''}
                      control={control}
                      rules={{
                        required:
                          'Phone Number is required',
                        pattern: {
                          value: /^[0-9]*$/,
                          message:
                            'Only numbers are allowed',
                        },
                        maxLength: {
                          value: 11,
                          message:
                            'Phone Number cannot exceed 11 digits',
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
                        required: 'Email ID is required',
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
                or use your account
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
                Forgot your password?
              </a>
              <button className={styles.button}>
                Sign In
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
                  Sign In
                </button>
              </div>
              <div
                className={`${styles['overlay-panel']} ${styles['overlay-right']}`}
              >
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
                  Sign Up
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
