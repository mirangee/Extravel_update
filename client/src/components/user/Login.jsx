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

import styles from '../../scss/Login.module.scss';
import { NAVER_AUTH_URI } from '../../config/Naver-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import GoogleLogin from './GoogleLogin';

const Login = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, errors },
    formState,
    register,
  } = useForm({
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사를 수행합니다.
  });

  const navigate = useNavigate(); //페이지 이동을 위해 useNavigate 훅 사용

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  // 폼이 제출되었을 때 호출되는 함수
  // const onSubmit = (data) => console.log(data);

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

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // 회원가입 데이터 전송을 위한 핸들러
  const onSubmit = async (data) => {
    // passwordConfirm 필드를 제거하여 서버로 전송하지 않음 ***
    const { passwordConfirm, ...submitData } = data;
    console.log(submitData);
    await sleep(2000);

    try {
      // 서버에 회원가입 요청을 보내는 fetch API 호출
      const response = await fetch(
        'http://localhost:8181/user/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData), // 폼에서 수집한 데이터를 JSON 형태로 변환(passwordConfirm 제외)
        },
      );

      if (!response.ok) {
        // 서버가 2xx 외의 상태 코드를 반환하면 오류 처리
        throw new Error(
          '서버가 올바르게 응답하지 않았습니다.',
        );
      }

      // 서버에서 받은 응답을 JSON 형태로 파싱
      const result = await response.json();

      if (response.url.includes('signup')) {
        // 회원가입 성공 시 사용자에게 알림 및 페이지 이동
        alert(
          `${result.name}님 회원가입이 성공적으로 완료되었습니다.`,
        );
        navigate('/'); // 회원가입 후 메인 페이지로 이동
      } else if (response.url.includes('login')) {
        // 로그인 성공 시 사용자에게 알림 및 페이지 이동
        alert(
          `${result.name}님 로그인이 성공적으로 완료되었습니다.`,
        );
        navigate('/main'); // 로그인 후 메인 페이지로 이동
      }
    } catch (error) {
      console.error(
        '회원가입 또는 로그인 요청 중 오류 발생:',
        error,
      );
      alert(
        '회원가입 또는 로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

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
              action='/user/auth/Login'
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              //handleSubmit 메서드를 사용하여 폼 제출을 처리
              //handleSubmit은 React Hook Form에서 제공하는 함수
              //폼 제출 시 실행되어야 하는 함수를 감싸주는 역할
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
                <GoogleLogin />
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
                      name='name' // 컨트롤러의 이름
                      control={control} // useForm에서 제공하는 컨트롤 객체
                      defaultValue={''} // 초기 값
                      {...register('name')}
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
                          {...field} // 필드 프로퍼티들을 TextField로 전달
                          value={field.value} // 컨트롤러의 값
                          onChange={field.onChange} // 값이 변경될 때 호출되는 함수
                          error={!!fieldState.error}
                          helperText={
                            fieldState.error &&
                            fieldState.error.message // 오류 메시지
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item style={{ width: '100%' }}>
                    <Controller
                      name='phoneNumber'
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
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          error={!!fieldState.error}
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
                          message:
                            '유효한 이메일 주소를 입력해주세요.',
                        },
                        minLength: {
                          value: 6,
                          message:
                            '이메일은 최소 6자리 이상이어야 합니다.',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Email ID'
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          error={!!fieldState.error}
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
                        required:
                          '비밀번호를 입력해주세요.',
                        pattern: {
                          value:
                            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                          message:
                            '비밀번호는 영문 숫자 특수기호 조합 8자리 이상이어야 합니다',
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Password'
                          type='password'
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          error={!!fieldState.error}
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
                          '비밀번호 확인을 입력해주세요.',
                        validate: (value) =>
                          value === passwordValue ||
                          '비밀번호가 일치하지 않습니다.',
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label='Confirm Password'
                          type='password'
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          error={!!fieldState.error}
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
                      가입하기
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {isSubmitSuccessful && (
                <p>Form submit successful.</p>
              )}
              {errors?.root?.server && (
                <p>Form submit failed.</p>
              )}
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
                <a
                  href={NAVER_AUTH_URI}
                  className={styles.social}
                >
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={naverCircle}
                  />
                </a>
                <a
                  href={KAKAO_AUTH_URL}
                  className={styles.social}
                >
                  <img
                    className={styles.naverImg}
                    alt='naverImg'
                    src={kakaoCircle}
                  />
                </a>
                <GoogleLogin />
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
