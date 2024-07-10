import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button, CloseButton } from 'reactstrap';
import styles from '../../scss/FindIDandPassword.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthNumTimer from './AuthNumTimer';
// import SMSUtils from '../../utils/SMSUtils';
import { useSMSUtils } from '../../utils/SMSUtils';

import {
  API_BASE_URL as BASE,
  USER,
} from '../../config/host-config';

// 1. 초기 상태 정의
const findIDInitialState = {
  name: '',
  phoneNumber: '',
  checkCode: '',
};

const findPWInitialState = {
  email: '',
  phoneNumber: '',
  checkCode: '',
};

//클릭 횟수
const IDClickInitialState = {
  authClickCount: 0,
  isVerified: false,
};

const PWClickInitialState = {
  authClickCount: 0,
  isVerified: false,
};

// 2. 리듀서 함수 정의
const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'INPUT_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'INPUT_PHONE':
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case 'INPUT_CODE':
      return {
        ...state,
        checkCode: action.checkCode,
      };
    case 'INCREMENT_AUTH_CLICK':
      console.log('increment_auth_click!');
      return {
        ...state,
        authClickCount: state.authClickCount + 1,
        isVerified: true,
      };

    default:
      return state;
  }
};

//本 함수
const FindIDandPassword = () => {
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  const navigate = useNavigate();

  //상태값 변경
  const [showIDSection, setShowIDSection] = useState(true);
  //타이머 보기 찾기 보이기
  const [showAuthNumTimer, setShowAuthNumTimer] =
    useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkCode, setCheckCode] = useState('');
  // const [randomCode, setRandomCode] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false);
  // const [isTimeZero, setIsTimeZero] = useState(false); //시간 0초 체크 //지워야 함 : 여기서 쓰지 말고 utils 로 보내기
  const [name, setName] = useState('');
  const [randomAuthCode, setRandomAuthCode] = useState('');
  const [showAuthNumInput, setShowAuthNumInput] =
    useState(false); // 인증번호 창 알림
  const [showCompleteButton, setShowCompleteButton] =
    useState(false); // 완료 버튼 표시 여부
  const [showAuthButton, setShowAuthButton] =
    useState(true); // "인증하기" 버튼 상태
  const [showNewPass, setShowNewPass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [newPassErr, setNewPassErr] = useState(false);
  const [newPassConfirmErr, setNewConfirmPassErr] =
    useState(false);
  //객체화
  const [disableInputs, setDisableInputs] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    checkCode: false,
  });

  const goToLogin = () => {
    navigate('/login');
  };

  // SMSUtil import
  const { sendSMS, checkSMS, handleTimeZero, isTimeZero } =
    useSMSUtils();

  // useEffect를 사용하여 인증 번호 타이머 관리
  useEffect(() => {
    if (showAuthNumTimer) {
      const timer = setTimeout(() => {
        handleTimeZero();
      }, 300000); // 5분 타이머

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [showAuthNumTimer]);

  // SMS 인증 확인 처리
  const handleSendSMS = () => {
    sendSMS(phoneNumber).then((code) => {
      //@@@ 요청 보낸거 받기
      // then 프로미스 값 해제 할 때(외부에서 호출 한 곳에서 비동기 통신한 결과 가져오기 : 컴포넌트 다를 경우 then으로 풀어야 함) @@@
      // 'sendSMS' 함수가 성공적으로 실행되고 반환된 인증 코드를 'code'로 받음
      console.log('promise 내의 result: ', code);
      console.log('phoneNumber : ', phoneNumber);
      setRandomAuthCode(code); //프로미스 code -> set에 담기
      if (!code) {
        //@@@ 요청 받은 값 false 일 때 처리
        setShowAuthNumTimer(false);
        setShowAuthNumInput(false);
        setShowAuthButton(true);
      } else {
        // UI 업데이트
        setShowAuthNumInput(true); //인증번호 창
        setShowAuthNumTimer(true);
        // setDisableInputs({
        //   name: true,
        //   email: true, // 이메일 입력 필드 비활성화
        //   phoneNumber: true, // 전화번호 입력 필드 비활성화
        // });
      }
    });
  };

  const FINDID_URL = BASE + USER + '/findid';
  const FINDPW_URL = BASE + USER + '/findpw';
  const SEND_ONE_URL = BASE + USER + '/send-one';

  // useReducer를 통한 상태 관리
  const [findIDState, dispatchFindID] = useReducer(
    reducer,
    findIDInitialState, //1. 초기 상태
  );

  const [findPWState, dispatchFindPW] = useReducer(
    reducer,
    findPWInitialState,
  );

  const [IDClickState, dispatchIDClick] = useReducer(
    reducer,
    IDClickInitialState,
  );

  const [PWClickState, dispatchPWClick] = useReducer(
    reducer,
    PWClickInitialState,
  );

  // useRef를 사용하여 DOM 요소에 접근
  const inputName = useRef('');
  const inputEmail = useRef('');
  const inputPhoneNumber = useRef('');
  const inputCheckCode = useRef('');

  // 인풋 값 변경 핸들러 : dispatch
  const onChangeName = (e) => {
    const nameValue = e.target.value;
    console.log(e.target.value);
    dispatchFindID({
      type: 'INPUT_NAME',
      name: nameValue,
    });
    setName(nameValue);
    setShowAuthButton(true);
    setShowAuthNumInput(false); // 이메일이 변경될 경우 인증번호 입력창 숨김
  };

  const onChangeNewPass = (value) => {
    if (
      !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(
        value,
      )
    ) {
      setNewPassErr(true);
    } else {
      setNewPassErr(false);
    }
    setNewPass(value);
  };
  const onChangeNewPassConfirm = (value) => {
    setNewPassConfirm(value);
  };
  const onSubmitNewPass = () => {
    if (newPassErr) {
      alert(
        '비밀번호는 영문 숫자 특수기호 조합 8자리 이상이어야 합니다.',
      );
      return;
    }
    if (newPassConfirmErr) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const data = {
      email: findPWState.email,
      newPass,
    };
    const setPass = async () => {
      const result = await axios.put(
        BASE + USER + '/newpass',
        data,
      );
      if (result.data === 'success') {
        alert('비밀번호가 수정되었습니다');
        navigate('/login');
      } else {
        alert('에러');
      }
    };
    setPass();
  };

  useEffect(() => {
    if (
      newPassConfirm !== '' &&
      newPass !== newPassConfirm
    ) {
      setNewConfirmPassErr(true);
    } else {
      setNewConfirmPassErr(false);
    }
  }, [newPass, newPassConfirm]);

  const onChangePhoneNumber = (e) => {
    const phoneNumberValue = e.target.value; //변경1
    if (showIDSection) {
      console.log(e.target.value);
      dispatchFindID({
        type: 'INPUT_PHONE',
        phoneNumber: phoneNumberValue, //변경2
      });
    } else {
      console.log(e.target.value);
      dispatchFindPW({
        type: 'INPUT_PHONE',
        phoneNumber: phoneNumberValue,
      });
    }
    setPhoneNumber(phoneNumberValue); // 전화번호 상태 업데이트
    setShowAuthButton(true);
    setShowAuthNumInput(false);
  };

  //인증번호 입력
  const onChangeCheckCode = (e) => {
    const checkCodeValue = e.target.value;

    if (showIDSection) {
      console.log(e.target.value);
      dispatchFindID({
        type: 'INPUT_CODE',
        checkCode: checkCodeValue,
      });
    } else {
      console.log(e.target.value);
      dispatchFindPW({
        type: 'INPUT_CODE',
        checkCode: checkCodeValue,
      });
    }
    setCheckCode(checkCodeValue); // 인증번호 입력값 상태 업데이트
    setShowAuthButton(false);
  };

  // 인증 번호 확인 버튼 클릭 핸들러
  // const onCheckCodeConfirm = (e) => {
  //   e.preventDefault();

  //   if (!isTimeZero) {
  //     checkSMS(
  //       checkCode,
  //       randomCode,
  //       setIsAuthCompleted,
  //       setResultMsg,
  //       setShowAuthNumTimer(false),
  //     );
  //   } else {
  //     setResultMsg(
  //       '인증 시간이 만료되었습니다. 재전송 버튼을 눌러 다시 시도하세요.',
  //     );
  //   }

  //   setShowAuthNumTimer(false);
  // };

  const onChangeEmail = (e) => {
    console.log(e.target.value);
    dispatchFindPW({
      type: 'INPUT_EMAIL',
      email: e.target.value,
    });
    setShowAuthNumInput(false);
  };

  // 인증하기 버튼 클릭 핸들러
  const onAuthClick = () => {
    setShowAuthButton(false);
    setShowCompleteButton(false);

    // 공통 입력값 검증
    const phoneNumberValue = showIDSection
      ? findIDState.phoneNumber
      : findPWState.phoneNumber;
    const emailValue = findPWState.email;
    const nameValue = findIDState.name;

    // 전화번호 유효성 검사
    const isValidPhoneNumber = (phoneNumber) => {
      const regex = /^\d{10,11}$/;
      if (!regex.test(phoneNumber)) {
        alert('전화번호 형식이 올바르지 않습니다.');
        return false;
      }
      return true;
    };

    // 아이디 찾기 섹션인 경우
    if (showIDSection) {
      // 이름과 전화번호가 입력되지 않은 경우 알림 후 종료
      if (!nameValue || !phoneNumberValue) {
        alert('이름과 전화번호를 입력하세요.');
        return;
      }

      // 전화번호 유효성 검사 통과 확인
      if (!isValidPhoneNumber(phoneNumberValue)) return;

      // SMS 전송
      handleSendSMS();

      setDisableInputs({
        name: true,
        email: true,
        phoneNumber: true,
        checkCode: false,
      });

      // setShowCompleteButton(true);

      // 아이디 찾기 섹션에서의 인증 클릭 횟수 증가 및 상태 업데이트
      // dispatchIDClick({ type: 'INCREMENT_AUTH_CLICK' });
      // console.log('IDClickState:', IDClickState);
    } else {
      // 비밀번호 찾기 섹션인 경우
      if (!emailValue || !phoneNumberValue) {
        alert('이메일과 전화번호를 입력하세요.');
        return;
      }

      // 전화번호 유효성 검사 통과 확인
      if (!isValidPhoneNumber(phoneNumberValue)) return;

      // SMS 전송
      handleSendSMS();

      setDisableInputs({
        name: true,
        email: true,
        phoneNumber: true,
        checkCode: false,
      });

      // UI 업데이트
      setShowAuthNumInput(true);
      setShowAuthNumTimer(true);
      // setShowCompleteButton(true);
    }
  };

  // const isValidPhoneNumber = (phoneNumber) => {
  //   const phoneNumberRegex = /^[0-9-]*$/;
  //   const isValid = phoneNumberRegex.test(phoneNumber);

  //   if (!isValid) {
  //     alert('숫자만 입력해주세요.');
  //     return false;
  //   }

  //   // '-' 제외하고 숫자만 남기기
  //   const filteredPhoneNumber = phoneNumber.replace(
  //     /-/g,
  //     '',
  //   );

  //   if (filteredPhoneNumber.length > 13) {
  //     alert('최대 13글자까지 입력할 수 있습니다.');
  //     return false;
  //   }

  //   if (phoneNumber.includes('-')) {
  //     alert("'-'를 제외하고 입력해주세요.");
  //     return false;
  //   }

  //   return true;
  // };

  // 폼 제출 핸들러
  const onSubmitForm = async (data) => {
    console.log('FindID state: ', findIDState);
    console.log('FindPW state: ', findPWState);

    try {
      const url = showIDSection ? FINDID_URL : FINDPW_URL;
      console.log(
        'onSubmitForm의 name, phoneNumber 상단 : ',
        name,
        phoneNumber,
      );
      /* eslint-disable prettier/prettier */
      const data = showIDSection
        ? {
          name: findIDState.name,
          phoneNumber: findIDState.phoneNumber,
          checkCode: findIDState.checkCode,
        }
        : {
          email: findPWState.email,
          phoneNumber: findPWState.phoneNumber,
          checkCode: findPWState.checkCode,
        };
      /* eslint-disable prettier/prettier */
      console.log('onSubmitForm의 하단 data : ', data);

      const response = await axios.post(url, data);
      if (!response.data.success) {
        // 성공적인 응답 처리
        console.log('response : ', response);
        alert('등록하신 전화번호로 데이터를 전송했습니다.');

        setShowAuthNumTimer(false);
        goToLogin();
      } else {
        // DB에 없는 정보로 인한 실패 처리
        alert(
          '입력하신 정보가 일치하지 않습니다. 다시 시도해 주세요.',
        );
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === '없는 번호입니다.'
      ) {
        console.log('없는 번호 입니다. ', error);
        // 서버에서 400 Bad Request 응답과 "없는 번호입니다." 메시지를 받은 경우
        setResultMsg(
          '입력하신 번호는 등록되어 있지 않습니다.',
        );
      } else {
        // 기타 오류 처리
        setResultMsg(
          '오류가 발생했습니다. 다시 시도해 주세요.',
        );

        console.error('응답 데이터:', error.response?.data);
        console.error('응답 상태:', error.response?.status);
        console.error(
          '응답 헤더:',
          error.response?.headers,
        );
      }
    }
  };

  useEffect(() => {
    console.log('useEffect Called!');
    console.log(IDClickState.authClickCount);
  }, [IDClickState]);
  //[IDClickState])에 포함된 값이 변경될 때마다 호출
  //useEffect는 IDClickState가 변경될 때마다 실행됩니다.
  //컴포넌트가 언마운트될 때(즉, DOM에서 제거될 때) 이전의 효과를 정리(clean-up)하는 기능도 제공
  //useEffect를 사용하면 사용자가 인증 버튼을 클릭할 때마다 authClickCount의 값이 콘솔에 기록되어, 몇 번의 인증 시도를 했는지 추적할 수 있음

  const [isRightPanelActive, setIsRightPanelActive] =
    useState(false);

  const handleButtonClick = () => {
    onAuthClick();
    setShowIDSection(true);
    // sendSMS();
    console.log('handleButtonClick 실행됨!!!');
  };

  const handleButtonClick2 = () => {
    onAuthClick();
    setShowIDSection(false);
    // sendSMS();
    console.log('handleButtonClick 실행됨2!!!');
  };

  const resetState = () => {
    setName('');
    setPhoneNumber('');
    setCheckCode('');
    setResultMsg('');
    setShowAuthNumTimer(false);
    setShowAuthNumInput(false);
    setShowCompleteButton(false);
    setShowAuthButton(true);
    setIsAuthCompleted(false);
    setDisableInputs(true);
  };

  const changeBtnID = () => {
    // 아이디 찾기 섹션으로 전환하고 상태 초기화
    setShowIDSection(true);
    resetState();
  };

  const changeBtnPW = () => {
    // 비밀번호 찾기 섹션으로 전환하고 상태 초기화
    setShowIDSection(false);
    dispatchFindPW({ type: 'INPUT_EMAIL', email: '' }); // 이메일 초기화
    resetState();
  };
  const changeShow = () => {
    setShowAuthNumTimer(!showAuthNumTimer);
  };

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
              {/* 아이디 찾기 */}
              <CloseButton
                className={styles.xButton}
                onClick={onClickBtn}
                type='button'
              />
              {showIDSection && (
                <div className={styles.id}>
                  <div className={styles.findId}>
                    아이디 찾기
                  </div>
                  <Input
                    onChange={onChangeName}
                    ref={inputName}
                    placeholder='이름을 입력하세요.'
                    // disabled={isAuthCompleted}
                    disabled={disableInputs.name}
                  />

                  <Input
                    onChange={onChangePhoneNumber}
                    ref={inputPhoneNumber}
                    placeholder='전화번호를 입력하세요.'
                    // disabled={isAuthCompleted}
                    disabled={disableInputs.phoneNumber}
                  />

                  <div className={styles.certifiedTag}>
                    {showAuthNumInput && (
                      <Input
                        className={styles.certifiedNumber}
                        onChange={onChangeCheckCode}
                        ref={inputCheckCode}
                        placeholder='인증번호를 입력하세요.'
                        // disabled={isAuthCompleted}
                        disabled={disableInputs.checkCode}
                      />
                    )}

                    {showAuthNumInput && (
                      <Button
                        className={styles.confirmNumber}
                        onClick={(e) => {
                          e.preventDefault();

                          if (!isTimeZero) {
                            console.log(
                              '인증확인 버튼의 randomAuthCode: , isTimeZero: ',
                              randomAuthCode,
                              isTimeZero,
                            );
                            const result = checkSMS(
                              //@@@ checkSMS 객체 true 리턴 FindIDandPW -> SMSUtils
                              checkCode,
                              randomAuthCode,
                              setIsAuthCompleted,
                              setResultMsg,
                            ); // 입력된 인증코드 검증
                            if (result) {
                              setShowAuthNumTimer(false);
                              setIsAuthCompleted(true); // 인증 완료 상태 업데이트
                              setShowCompleteButton(true);
                              setDisableInputs({
                                name: true,
                                email: true,
                                phoneNumber: true,
                                checkCode: true,
                              });
                            }
                            console.log(
                              '인증번호 확인 클릭  : checkCode',
                              checkCode,
                            );
                          } else {
                            alert(
                              '인증 시간이 만료되었습니다. 재전송 버튼을 눌러 다시 시도하세요.',
                            );
                          }
                        }}
                        variant='contained'
                      // style={{
                      //   marginTop: 10,
                      //   marginLeft: '100px',
                      //   background: 'black',
                      //   display: !isAuthCompleted
                      //     ? 'block'
                      //     : 'none',
                      // }}
                      >
                        인증번호 확인
                      </Button>
                    )}
                  </div>

                  <div className={styles.idbtn}>
                    {showCompleteButton && ( // 완료 버튼의 조건부 렌더링
                      <Button
                        color='success'
                        className={styles.submitButton}
                        onClick={onSubmitForm}
                      >
                        완료
                      </Button>
                    )}

                    {showAuthButton && (
                      <Button
                        className={styles.certifiedBtn}
                        size='mid'
                        onClick={handleButtonClick}
                      >
                        인증하기
                      </Button>
                    )}

                    <div>
                      {' '}
                      {showAuthNumTimer && (
                        <AuthNumTimer
                          onTimeZero={handleTimeZero}
                          handleSendSMS={handleSendSMS}
                          phoneNumber={phoneNumber}
                        />
                      )}
                    </div>
                  </div>

                  {/* resultMsg를 화면에 표시 */}
                  {resultMsg && (
                    <div className={styles.resultMsg}>
                      {resultMsg}
                    </div>
                  )}

                  <a
                    className={styles.changeBtn}
                    onClick={changeBtnPW}
                  >
                    혹시 아이디는 기억나고 비밀번호만
                    찾으시나요?
                  </a>
                </div>
              )}

              {/* ### */}
              {/* 비밀번호 찾기 */}
              {!showIDSection && (
                <div className={styles.pw}>
                  <div className={styles.findId} onClick={() => {
                    console.log(newPass);
                    console.log(newPassConfirm);
                  }}>
                    {showNewPass ? '새로운 비밀번호 입력' : '비밀번호 찾기'}
                  </div>
                  {!showNewPass && <>
                    <Input
                      onChange={onChangeEmail}
                      ref={inputEmail}
                      placeholder='이메일을 입력하세요.'
                      // disabled={isAuthCompleted}
                      disabled={disableInputs.email}
                    />

                    <Input
                      onChange={onChangePhoneNumber}
                      ref={inputPhoneNumber}
                      placeholder='전화번호를 입력하세요.'
                      // disabled={isAuthCompleted}
                      disabled={disableInputs.phoneNumber}
                    />
                  </>}
                  {showNewPass && <div className={styles.newPass}>
                    <Input
                      type='password'
                      onChange={(e) => onChangeNewPass(e.target.value)}
                      value={newPass}
                      placeholder='비밀번호를 입력'
                    // disabled={isAuthCompleted}
                    />
                    {newPassErr && <div className={styles.errMsg}>비밀번호는 영문 숫자 특수기호 조합 8자리 이상이어야 합니다.</div>}
                    <Input
                      type='password'
                      onChange={(e) => onChangeNewPassConfirm(e.target.value)}
                      value={newPassConfirm}
                      placeholder='비밀번호 확인'
                    // disabled={isAuthCompleted}
                    />
                    {newPassConfirmErr && <div className={styles.errMsg}>비밀번호가 일치하지 않습니다.</div>}
                  </div>}

                  <div className={styles.certifiedTag}>
                    {showAuthNumInput && (
                      <Input
                        className={styles.certifiedNumber}
                        onChange={onChangeCheckCode}
                        ref={inputCheckCode}
                        placeholder='인증번호를 입력하세요'
                        //disabled={isAuthCompleted}
                        disabled={disableInputs.checkCode}
                      />
                    )}

                    {showAuthNumInput && (
                      <Button
                        className={styles.confirmNumber}
                        onClick={(e) => {
                          e.preventDefault();

                          if (!isTimeZero) {
                            console.log(
                              '인증확인 버튼의 randomAuthCode: , isTimeZero: ',
                              randomAuthCode,
                              isTimeZero,
                            );
                            const result = checkSMS(
                              checkCode,
                              randomAuthCode,
                              setIsAuthCompleted,
                              setResultMsg,
                            ); // 입력된 인증코드 검증
                            if (result) {
                              setShowAuthNumTimer(false);
                              setIsAuthCompleted(true); // 인증 완료 상태 업데이트 @@@
                              setShowCompleteButton(true);
                              setShowNewPass(true);
                              setShowAuthNumInput(false);
                              setDisableInputs({
                                name: true,
                                email: true,
                                phoneNumber: true,
                                checkCode: true,
                              });
                            }
                            console.log(
                              '인증번호 확인 클릭  : checkCode',
                              checkCode,
                            );
                          } else {
                            setResultMsg(
                              '인증 시간이 만료되었습니다. 재전송 버튼을 눌러 다시 시도하세요.',
                            );
                          }
                        }}
                        variant='contained'
                      // color='success'
                      // style={{
                      //   marginTop: 10,
                      //   marginLeft: '100px',
                      //   background: 'black',
                      //   display: !isAuthCompleted
                      //     ? 'block'
                      //     : 'none',
                      // }}
                      // color='success'
                      // style={{
                      //   marginTop: 10,
                      //   marginLeft: '100px',
                      //   background: 'black',
                      //   display: !isAuthCompleted
                      //     ? 'block'
                      //     : 'none',
                      // }}
                      >
                        인증번호 확인
                      </Button>
                    )}

                  </div>

                  <div className={styles.pwbtn}>
                    {showCompleteButton && ( // 완료 버튼의 조건부 렌더링
                      <Button
                        className={styles.submitButton}
                        onClick={onSubmitNewPass}
                        navigate
                      >
                        완료
                      </Button>
                    )}

                    {showAuthButton && (
                      <Button
                        className={styles.submitButton}
                        size='mid'
                        onClick={handleButtonClick2}
                      >
                        {/* {PWClickState.authClickCount > 0
                  ? '재인증'
                  : '인증하기'} */}
                        인증하기
                      </Button>
                    )}

                    <div>
                      {' '}
                      {showAuthNumTimer && (
                        <AuthNumTimer
                          onTimeZero={handleTimeZero}
                          handleSendSMS={handleSendSMS}
                          phoneNumber={phoneNumber}
                        />
                      )}
                    </div>
                  </div>

                  {/* resultMsg를 화면에 표시 */}
                  {resultMsg && (
                    <div className={styles.resultMsg}>
                      {resultMsg}
                    </div>
                  )}
                  <a
                    className={styles.changeBtn}
                    onClick={changeBtnID}
                  >
                    혹시 아이디가 기억이 나지 않으세요?
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindIDandPassword;