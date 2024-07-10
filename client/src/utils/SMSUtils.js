import { useState } from 'react';
import axios from 'axios';
import {
  API_BASE_URL as BASE,
  USER,
} from '../config/host-config';

const FIND_IDPW_URL = BASE + USER + '/findidpw'; //아이디/비번 찾기 sms 발송

// 커스텀 훅 useSMSUtils 정의
export const useSMSUtils = () => {
  // 상태값들을 useState를 통해 정의
  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false); // 인증 완료 여부 상태
  const [isTimeZero, setIsTimeZero] = useState(false); // 시간 0초 체크
  const [randomCode, setRandomCode] = useState(''); // 인증값 상태
  const [isUsefulRandomCode, setIsUsefulRandomCode] =
    useState(false);
  useState(false);

  // 아이디/비번 인증번호 메세지 발송 @@@
  const sendSMS = async (data) => {
    console.log('아이디 비번 찾기 data : ', data);
    // 입력받은 데이터에서 전화번호를 추출
    const phoneNumber = data; //data는 객체 형태라서 data.phoneNumber 아님

    console.log(
      '아이디 비번 찾기 phoneNumber : ',
      phoneNumber,
    );
    try {
      // 서버에 인증번호 요청을 보내는 부분
      const res = await axios.post(FIND_IDPW_URL, {
        phoneNumber,
      });

      // 응답 상태와 데이터를 콘솔에 출력하여 확인
      console.log('res는?  : ', res);
      console.log('res.status : ', res.status);
      console.log('res.data : ', res.data);

      // 서버 응답이 있고, 응답 데이터가 존재하는 경우 처리
      if (res && res.data) {
        console.log('발송 성공!!! : ', phoneNumber);
        const saveRandomCode = res.data;
        console.log('res : , res.data : ', res, res.data);
        console.log(
          '인증번호 메세지 발송 saveRandomCode: ',
          saveRandomCode,
        );
        setRandomCode(saveRandomCode);
        alert('인증번호가 발송되었습니다.');
        return saveRandomCode; // 리턴
      }
    } catch (error) {
      // 에러 로그 출력 및 상태 코드 확인
      console.error('에러 발생:', error);
      if (error.response) {
        console.log(
          'error.response.status : ',
          error.response.status,
        );
        console.log(
          'error.response.data : ',
          error.response.data,
        );
        if (error.response.status === 400) {
          alert(
            '입력하신 정보와 일치하는 데이터를 찾지 못했습니다.',
          );
          return false; //@@@ false 처리
        } else {
          alert('서버 에러가 발생했습니다.');
          return false;
        }
      } else {
        alert('요청 중에 문제가 발생했습니다.');
        return false;
      }
    }
  };

  // 체크 메시지 함수
  const checkSMS = (
    checkCode,
    randomCode,
    setIsAuthCompleted,
    setResultMsg,
  ) => {
    console.log('');
    const checkCodeStr = checkCode.toString();
    console.log(
      'SMSUtils의 체크 메시지의 checkSMS checkCodeStr는???',
      checkCodeStr,
    );
    console.log(
      'SMSUtils의 체크 메시지의 checkSMS randomCode는???',
      randomCode,
    );
    let msg;
    console.log('msg : ', msg);
    if (checkCodeStr === '') {
      alert('값을 입력해주세요');
      return;
    }
    if (+checkCodeStr === +randomCode) {
      msg = '휴대폰 인증이 정상적으로 완료되었습니다.';

      console.log(
        '성공 msg : , randomCode :',
        msg,
        randomCode,
      );

      setIsAuthCompleted(true);
    } else {
      msg = '인증번호가 올바르지 않습니다.';
      console.log('실패 msg : ', msg);
      console.log(
        'checkCodeStr, randomCode : ',
        checkCodeStr,
        randomCode,
      );

      setIsAuthCompleted(false);
      alert('인증번호가 올바르지 않습니다.');
      return;
    }
    setResultMsg(msg);
    return true; //@@@ checkSMS 모든 조건 참일 경우 객체 true 리턴
  };

  // 메시지 0초시 유효성 없애기 함수
  const handleTimeZero = (isZero, randomCode) => {
    console.log('handleTimeZero isZero : ', isZero);
    setIsTimeZero(isZero);
    if (isZero) {
      setRandomCode(''); // 타이머가 0이면 인증 코드를 무효화
      console.log('setRandomCode? : ', randomCode);
      setIsUsefulRandomCode(false); // 랜덤코드 비활성화
    }
  };

  // 커스텀 훅에서 필요한 함수와 상태값들을 반환
  return {
    sendSMS,
    checkSMS,
    handleTimeZero,
    isAuthCompleted, // 필요에 따라 인증 완료 상태 반환
    isTimeZero, // 타이머 0 상태 반환
    randomCode, // 랜덤 코드 상태 반환
    isUsefulRandomCode,
  };
};
