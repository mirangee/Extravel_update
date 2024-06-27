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
import a7 from '../../assets/img/a7.jpg';
import axios from 'axios';
import AuthNumTimer from './AuthNumTimer';
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

  //config
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

  // 인풋 값 변경 핸들러
  const onChangeName = (e) => {
    console.log(e.target.value);
    dispatchFindID({
      type: 'INPUT_NAME',
      name: e.target.value,
    });
  };

  const onChangePhoneNumber = (e) => {
    if (showIDSection) {
      console.log(e.target.value);
      dispatchFindID({
        type: 'INPUT_PHONE',
        phoneNumber: e.target.value,
      });
    } else {
      console.log(e.target.value);
      dispatchFindPW({
        type: 'INPUT_PHONE',
        phoneNumber: e.target.value,
      });
    }
  };

  const onChangeCheckCode = (e) => {
    if (showIDSection) {
      console.log(e.target.value);
      dispatchFindID({
        type: 'INPUT_CODE',
        checkCode: e.target.value,
      });
    } else {
      console.log(e.target.value);
      dispatchFindPW({
        type: 'INPUT_CODE',
        checkCode: e.target.value,
      });
    }
  };

  const onChangeEmail = (e) => {
    console.log(e.target.value);
    dispatchFindPW({
      type: 'INPUT_EMAIL',
      email: e.target.value,
    });
  };

  // 인증하기 버튼 클릭 핸들러
  const onAuthClick = () => {
    if (showIDSection) {
      dispatchIDClick({ type: 'INCREMENT_AUTH_CLICK' });
      console.log('IDClickState:', IDClickState);
    } else {
      dispatchPWClick({ type: 'INCREMENT_AUTH_CLICK' });
      console.log('PWClickState:', PWClickState);
    }
  };

  // 폼 제출 핸들러
  const onSubmitForm = async () => {
    console.log('FindID state: ', findIDState);
    console.log('FindPW state: ', findPWState);

    try {
      const url = showIDSection ? FINDID_URL : FINDPW_URL;
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

      const response = await axios.post(url, data);
      console.log(response.data);
      // API 호출 성공 시 처리 로직
    } catch (error) {
      console.error('API 호출 오류:', error);
      // API 호출 실패 시 처리 로직
    }
  };

  useEffect(() => {
    console.log('useEffect Called!');
    console.log(IDClickState.authClickCount);
  }, [IDClickState]);

  return (
    <>
      <div className={styles.all}>
        {/* 아이디 찾기 */}
        <CloseButton
          className={styles.xButton}
          onClick={onClickBtn}
          type='button'
        />
        {showIDSection && (
          <div className={styles.id}>
            <div>아이디 찾기</div>
            <Input
              onChange={onChangeName}
              ref={inputName}
              placeholder='이름을 입력하세요.'
            />

            <Input
              onChange={onChangePhoneNumber}
              ref={inputPhoneNumber}
              placeholder='전화번호를 입력하세요'
            />
            <Input
              onChange={onChangeCheckCode}
              ref={inputCheckCode}
              placeholder='인증번호를 입력하세요'
            />

            <div className={styles.idbtn}>
              <Button
                onClick={onSubmitForm}
                style={{ margin: '10px' }}
                type='primary'
              >
                완료
              </Button>
              <AuthNumTimer
              // onTimeZero={handleTimeZero} //@@@ 타이머가 0이 되었을 때 호출될 콜백 함수
              // sendSMS={sendSMS}
              // phoneNumber={phoneNumber}
              />
              <Button
                color='primary'
                size='lg'
                onClick={() => {
                  onAuthClick();
                  // sendSMS(inputCheckCode);
                }}
              >
                {IDClickState.authClickCount > 0
                  ? '재인증'
                  : '인증하기'}
              </Button>
            </div>
            <a
              className={styles.changeBtn}
              onClick={() => setShowIDSection(false)}
            >
              혹시 아이디는 기억나고 비밀번호만 찾으시나요?
            </a>
          </div>
        )}

        {/* 비밀번호 찾기 */}
        {!showIDSection && (
          <div className={styles.pw}>
            <div>비밀번호 찾기</div>
            <Input
              onChange={onChangeEmail}
              ref={inputEmail}
              placeholder='이메일을 입력하세요.'
            />

            <Input
              onChange={onChangePhoneNumber}
              ref={inputPhoneNumber}
              placeholder='전화번호를 입력하세요'
            />
            <Input
              onChange={onChangeCheckCode}
              ref={inputCheckCode}
              placeholder='인증번호를 입력하세요'
            />
            <div className={styles.pwbtn}>
              <Button
                onClick={onSubmitForm}
                style={{ margin: '10px' }}
                type='primary'
              >
                완료
              </Button>
              <Button
                color='primary'
                size='lg'
                onClick={() => {
                  onAuthClick();
                }}
              >
                {PWClickState.authClickCount > 0
                  ? '재인증'
                  : '인증하기'}
              </Button>
            </div>
            <a
              className={styles.changeBtn}
              onClick={() => setShowIDSection(true)}
            >
              혹시 아이디가 기억이 나지 않으세요?
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default FindIDandPassword;
