import React, {
  useState,
  useContext,
  useEffect,
  input,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useNavigate,
  Link,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import naverCircle from '../../assets/img/naver_circle.png';
import kakaoCircle from '../../assets/img/kakao_circle.png';
import a7 from '../../assets/img/a7.jpg';
import styles from '../../scss/Login.module.scss';
import { NAVER_AUTH_URI } from '../../config/Naver-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import AuthContext from '../../utils/AuthContext';
import AuthNumTimer from './AuthNumTimer';
import FindIDandPassword from './FindIDandPassword';

import {
  API_BASE_URL as BASE,
  USER,
} from '../../config/host-config';

const Login = () => {
  const REQUEST_URL = BASE + USER + '/signin';
  const SEND_ONE_URL = BASE + USER + '/send-one';
  const CHECK_EMAIL_URL = BASE + USER + '/check';
  const SIGNUP_URL = BASE + USER + '/signup';

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); //로그인 성공 체크
  const [randomCode, setRandomCode] = useState(''); //인증값 상태
  const [checkCode, setCheckCode] = useState(''); //사용자 입력 인증값
  const [showAuthNumTimer, setShowAuthNumTimer] =
    useState(false); //인증 일치 검증
  const [resultMsg, setResultMsg] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] =
    useState(false); // 회원 가입 가능 여부 상태

  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false); // 인증 완료 여부 상태
  const [isEmailChecked, setIsEmailChecked] =
    useState(false); // 이메일 확인 여부 상태
  const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태

  const [isTimeZero, setIsTimeZero] = useState(false); //시간 0초 체크
  const [showPhoneNumInput, setShowPhoneNumInput] =
    useState(true); //전화번호 입력창
  const [showEmailInput, setshowEmailInput] =
    useState(true); //이메일 입력창

  const navigate = useNavigate(); //페이지 이동을 위해 useNavigate 훅 사용
  const redirection = useNavigate();

  //로그인 시 화면 이동
  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setTimeout(() => {
        redirection('/');
      }, 2000);
    }
  }, [isLoggedIn]);

  //회원가입 signUpControl useForm
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

  const {
    handleSubmit: onSubmitLogin,
    formState: {
      isSubmitSuccessful: isLoginSuccessful,
      errors: loginErrors,
    },
    register: loginRegister,
  } = useForm({
    mode: 'onChange',
  });

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

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

  //setTimeout 함수를 사용하여 일정 시간(ms) 동안 대기한 후, resolve 콜백을 호출하여 Promise 처리
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // 회원가입 데이터 전송을 위한 핸들러
  const handleSignUpSubmit = async (data) => {
    // passwordConfirm 필드를 제거하여 서버로 전송하지 않음 ***

    console.log('submitHandler 안에서의 data: ', data);

    const { passwordConfirm, ...submitData } = data;
    submitData.phoneNumber = phoneNumber; //@@@ phoneNumber 데이터 따로 추가
    console.log(
      'handleSignUpSubmit data 넘어옴: ',
      submitData,
    );

    try {
      // 중복이 아니면 회원가입 요청 보내기
      // 중복 체크와 인증 완료 여부 확인
      if (!isEmailChecked) {
        alert('이메일 중복 확인을 해주세요.');
        return;
      }

      if (!isAuthCompleted) {
        alert('휴대폰 인증을 완료해주세요.');
        return;
      }

      await sleep(2000); // 임시 대기

      // 서버에 회원가입 요청을 보내는 fetch API 호출
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData), // 회원가입 데이터 전송
      });

      if (!response.ok) {
        throw new Error(
          '서버가 올바르게 응답하지 않았습니다.',
        );
      }

      const result = await response.json();

      // 회원가입 성공 처리
      alert(
        `${result.name}님 회원가입이 성공적으로 완료되었습니다.`,
      );

      navigate('/login'); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert(
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  //로그인 데이터 전송
  const fetchLogin = async (data) => {
    try {
      console.log('fetchLogin data = ', data);

      const res = await axios.post(REQUEST_URL, data);
      console.log(res.data);
      return res.data; // 서버 응답 데이터 반환
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      throw new Error(
        '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  // SMS 인증 확인 처리
  const handleSendSMS = () => {
    sendSMS(phoneNumber).then((code) => {
      // then 프로미스 값 해제 할 때(외부에서 호출 한 곳에서 비동기 통신한 결과 가져오기 : 컴포넌트 다를 경우 then으로 풀어야 함) @@@
      console.log('promise 내의 result: ', code);
      setRandomCode(code); //프로미스 code -> set에 담기
    });
  };

  // 번호 인증을 위한 SMS 전송
  const sendSMS = async (phoneNumber) => {
    console.log('로그인 phoneNumber : ', phoneNumber);
    try {
      if (!phoneNumber || phoneNumber.length !== 11) {
        alert('전화번호를 11자리로 입력해주세요!!!');
        setShowAuthNumTimer(false);
        return;
      }

      const res = await axios.post(SEND_ONE_URL, {
        phoneNumber,
      });
      console.log('서버 응답:', res); // 응답 전체를 출력

      if (res && res.data) {
        console.log('발송 성공!!! : ', phoneNumber);
        const saveRandomCode = res.data;
        console.log('randomCode: ', saveRandomCode);
        setRandomCode(saveRandomCode);
        console.log('발송 후 randomCode: ', saveRandomCode);
        alert('인증번호가 발송되었습니다.');
        setShowPhoneNumInput(false);
        setShowAuthNumTimer(true);
        return saveRandomCode; //@@@ 찾음
      } else {
        console.error(
          '서버 응답이 유효하지 않습니다:',
          res,
        );
        alert('서버 응답이 유효하지 않습니다.');
        setShowAuthNumTimer(false);
        setShowPhoneNumInput(true);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      setShowAuthNumTimer(false);
      setShowPhoneNumInput(true);
    }
  };

  useEffect(() => {
    console.log('randomCode가 업데이트됨:', randomCode);
  }, [randomCode]);

  // 인증번호 확인
  const checkSMS = (checkCode) => {
    const checkCodeStr = checkCode.toString();
    console.log('checkCodeStr는???', checkCodeStr);
    console.log('randomCode는???', randomCode);
    let msg;
    if (checkCodeStr === '') {
      alert('값을 입력해주세여');
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

  const onChangeEmailHandler = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
    setIsEmailChecked(false);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  //로그인 핸들러
  const handleLoginSubmit = async () => {
    // const { passwordConfirm, ...submitData } = data;
    console.log('로그인 데이터 넘어옴', email, password);

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const data = {
      email,
      password,
    };
    try {
      //서버로 로그인 요청
      const response = await fetchLogin(data);

      //로그인 성공
      onLogin(response);
      alert(`${response.name}님 환영합니다!!! ^^`);
      redirection('/main/exrates');
    } catch (error) {
      console.error('로그인 요청 중 오류 발생', error);
      alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  };

  const fetchDuplicateCheck = async (email) => {
    try {
      if (!email || email.trim() === '') {
        alert('이메일을 입력해주세요.');
        return false; // 이메일이 비어 있으면 false 반환
      }

      console.log('axios fetchDuplicateChec 시작!', {
        email,
      });
      const res = await axios.post(CHECK_EMAIL_URL, {
        email,
      });

      console.log('check로 데이터 전송 email : ', email);
      if (res.data) {
        alert('이미 등록된 이메일입니다.');
        setIsEmailChecked(false);
        return true; // 중복된 이메일이면 true 반환
      } else {
        alert('사용 가능한 이메일 입니다.');
        setshowEmailInput(false);
        setIsEmailChecked(true);

        return false; // 중복되지 않은 이메일이면 false 반환
      }
    } catch (error) {
      console.error('fetchDuplicateCheck 오류:', error);
      // 에러 처리 - 필요에 따라 추가
      throw error; // 상위 호출자에게 에러를 전파
    }
  };

  const handleTimeZero = (isZero) => {
    setIsTimeZero(isZero);
    if (isZero) {
      setRandomCode(''); // 타이머가 0이면 인증 코드를 무효화
      setIsSignUpEnabled(false); // 회원 가입 비활성화
    }
  };

  // 회원가입 데이터 초기화
  // const handleSignUpReset = () => {
  //   setEmail('');
  //   setPassword('');
  //   setRandomCode('');
  //   setCheckCode('');
  //   setShowAuthNumTimer(false);
  //   setResultMsg('');
  //   setIsSignUpEnabled(false);
  //   setIsAuthCompleted(false);
  //   setIsEmailChecked(false);
  //   setPhoneNumber('');
  //   setIsTimeZero(false);
  //   setShowPhoneNumInput(true);
  // };

  return (
    <>
      <div className={styles.login}>
        <h2 className={styles.toplogo}>EXTRAVEL</h2>

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
                onSubmit={onSubmitSignUp(
                  handleSignUpSubmit,
                )}
              >
                {/*handleSubmit 메서드를 사용하여 폼 제출을 처리
              handleSubmit은 React Hook Form에서 제공하는 함수
              폼 제출 시 실행되어야 하는 함수를 감싸주는 역할 */}
                <button
                  className={styles.backButton}
                  onClick={onClickBtn}
                >
                  X
                </button>
                <h1>Sign Up</h1>
                <div className={styles['social-container']}>
                  {/* 소셜 아이콘 (네이버, 카카오, 구글) */}
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
                      alt='kakaoImg'
                      src={kakaoCircle}
                    />
                  </a>
                  <GoogleLogin />
                </div>
                <span className={styles.span}>
                  혹은 이메일을 사용하여 회원가입 하기
                </span>
                <Grid
                  item
                  xs={12}
                  className={styles.GridAll}
                >
                  <Grid>
                    <Grid className={styles.GridBox0}>
                      <Controller
                        className={styles.resultMsg}
                        name='name' // 컨트롤러의 이름
                        control={signUpControl} // useForm에서 제공하는 컨트롤 객체
                        defaultValue={''} // 초기 값
                        {...signUpRegister('name')}
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

                    <Grid className={styles.GridBox}>
                      {/* 전화번호 입력 및 SMS 전송 */}
                      <Controller
                        name='phoneNumber'
                        defaultValue={''}
                        disabled={
                          !showPhoneNumInput ||
                          isAuthCompleted
                        }
                        control={signUpControl}
                        rules={{
                          required:
                            '전화번호를 입력해주세요!.',
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
                          <>
                            <TextField
                              className={
                                styles.phoneNumberCheck
                              }
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
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                setPhoneNumber(field.value);
                                sendSMS(field.value); // 전화번호로 SMS 전송
                              }}
                              variant='contained'
                              className={styles.NumCheckBtn}
                              style={{
                                opacity: isAuthCompleted
                                  ? 0
                                  : 1,
                              }}
                            >
                              번호인증
                            </Button>
                          </>
                        )}
                      />
                    </Grid>

                    {/* 인증번호 입력 및 확인 */}
                    {showAuthNumTimer && (
                      <>
                        <Grid className={styles.GridBox2}>
                          <TextField
                            fullWidth
                            variant='outlined'
                            label='인증번호'
                            value={checkCode}
                            onChange={(e) =>
                              setCheckCode(e.target.value)
                            }
                            disabled={isAuthCompleted} // 인증 완료 시 비활성화
                          />

                          <div className={styles.GridBox3}>
                            <div className={styles.sec1}>
                              {showAuthNumTimer &&
                                !isAuthCompleted && (
                                  <AuthNumTimer
                                    onTimeZero={
                                      handleTimeZero
                                    } //@@@ 타이머가 0이 되었을 때 호출될 콜백 함수
                                    handleSendSMS={
                                      handleSendSMS
                                    }
                                    phoneNumber={
                                      phoneNumber
                                    }
                                  />
                                )}
                            </div>

                            <Button
                              className={
                                styles.MuiCheckBtn1
                              }
                              onClick={(e) => {
                                e.preventDefault();

                                if (!isTimeZero) {
                                  checkSMS(checkCode); // 입력된 인증코드 검증
                                } else {
                                  setResultMsg(
                                    '인증 시간이 만료되었습니다. 다시 시도하세요.',
                                  );
                                }
                              }}
                              variant='contained'
                              color='success'
                              style={{
                                display: !isAuthCompleted
                                  ? 'block'
                                  : 'none',
                              }}
                            >
                              인증하기
                            </Button>
                          </div>
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
                      </>
                    )}

                    <Grid className={styles.GridBox1}>
                      <Controller
                        name='email'
                        control={signUpControl}
                        defaultValue={''}
                        // disabled={!showEmailInput}
                        rules={{
                          required:
                            '이메일을 입력해주세요.',
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
                          <>
                            <TextField
                              className={styles.emailInput}
                              label='Email ID'
                              {...field}
                              value={field.value}
                              onChange={field.onChange}
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error &&
                                fieldState.error.message
                              }
                              size='small'
                              InputProps={{
                                readOnly: !showEmailInput,
                              }} //@@@ mui 기능
                            />
                            <button
                              className={styles.CheckButton}
                              onClick={(e) => {
                                e.preventDefault();
                                fetchDuplicateCheck(
                                  field.value,
                                );
                              }}
                            >
                              중복체크
                            </button>
                          </>
                        )}
                      />
                    </Grid>

                    <Grid className={styles.GridBox4}>
                      <Controller
                        name='password'
                        defaultValue={''}
                        control={signUpControl}
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
                            sx={{ m: 1 }} // 여기서 my는 margin-top과 margin-bottom을 나타내며, 다른 여백도 필요한 경우 mx, mt, mb, ml, mr과 같은 다양한 margin 속성을 사용할 수 있습니다.
                          />
                        )}
                      />
                    </Grid>
                    <Grid className={styles.GridBox5}>
                      <Controller
                        name='passwordConfirm'
                        defaultValue={''}
                        control={signUpControl}
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
                    {/* <Grid className={styles.GridBox}> */}
                    <Button
                      type='submit'
                      variant='contained'
                      hidden={
                        !isAuthCompleted || !isEmailChecked
                      }
                    >
                      가입하기
                    </Button>
                    {/* </Grid> */}
                  </Grid>
                </Grid>
                {isSignUpSuccessful && (
                  <p>Form submit successful.</p>
                )}
                {signUpErrors?.root?.server && (
                  <p>Form submit failed.</p>
                )}
              </form>
            </div>
            {/* 로그인 화면 */}
            <div
              className={`${styles['form-container']} ${styles['sign-in-container']}`}
            >
              <form
                action='/user/auth/Login'
                onSubmit={onSubmitLogin(handleLoginSubmit)}
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
                      alt='kakaoImg'
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
                  onChange={onChangeEmailHandler}
                />
                <input
                  className={styles.input1}
                  type='password'
                  placeholder='Password'
                  onChange={onChangePasswordHandler}
                />

                <Link to='/login/FindIDandPassword'>
                  아이디/비밀번호 찾기
                </Link>
                {/* @@@ */}

                <Button
                  className={styles.button}
                  type='submit'
                >
                  로그인
                </Button>
              </form>
            </div>
            <div className={styles['overlay-container']}>
              <div className={styles.overlay}>
                <div
                  className={`${styles['overlay-panel']} ${styles['overlay-left']}`}
                >
                  <h1>
                    {/* EXTRAVEL
                    <br /> */}
                    Create Account
                  </h1>
                  <p>
                    To keep connected with us <br /> please
                    login with your personal info
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
                  <h1>
                    {/* EXTRAVEL
                    <br /> */}
                    Login
                  </h1>
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
    </>
  );
};

export default Login;
