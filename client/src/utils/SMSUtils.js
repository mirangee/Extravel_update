import { useState } from 'react';
import axios from 'axios';
import {
  API_BASE_URL as BASE,
  USER,
} from '../config/host-config';

const FIND_IDPW_URL = BASE + USER + '/findidpw';

// 커스텀 훅 useSMSUtils 정의
export const useSMSUtils = () => {
  // 상태값들을 useState를 통해 정의
  const [isAuthCompleted, setIsAuthCompleted] =
    useState(false); // 인증 완료 여부 상태
  const [isTimeZero, setIsTimeZero] = useState(false); // 시간 0초 체크
  const [randomCode, setRandomCode] = useState(''); // 인증값 상태
  const [isUsefulRandomCode, setIsUsefulRandomCode] =
    useState(false);

  // 메세지 발송 함수
  const sendSMS = async (
    phoneNumber,
    setRandomCode,
    setShowAuthNumTimer,
  ) => {
    console.log('로그인 phoneNumber : ', phoneNumber);
    try {
      if (!phoneNumber || phoneNumber.length === 0) {
        alert('전화번호를 입력해주세요');
        setShowAuthNumTimer(false);
        return;
      }

      const res = await axios.post(FIND_IDPW_URL, {
        phoneNumber,
      });
      if (res && res.data) {
        console.log('발송 성공!!! : ', phoneNumber);
        const saveRandomCode = res.data;
        console.log('randomCode: ', saveRandomCode);
        setRandomCode(saveRandomCode);
        alert('인증번호가 발송되었습니다.');
        setShowAuthNumTimer(true);
        return saveRandomCode; //리턴
      } else if (
        res.status === 400 &&
        res.data === '없는 번호입니다.'
      ) {
        console.error('없는 번호:', res);
        alert(
          '입력하신 정보와 일치하는 데이터를 찾지 못했습니다.',
        );

        setShowAuthNumTimer(false);
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
      // alert(error.response.data);
      setShowAuthNumTimer(false);
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
    console.log('checkCodeStr는???', checkCodeStr);
    console.log('randomCode는???', randomCode);
    let msg;
    console.log('msg : ', msg);
    if (checkCodeStr === '') {
      alert('값을 입력해주세요');
      return;
    }
    if (+checkCodeStr === +randomCode) {
      alert('휴대폰 인증이 정상적으로 완료되었습니다.');
      console.log('성공 msg : ', msg);

      setIsAuthCompleted(true);
    } else {
      alert('인증번호가 올바르지 않습니다.');
      console.log('실패 msg : ', msg);
      console.log(
        'checkCodeStr, randomCode : ',
        checkCodeStr,
        randomCode,
      );

      setIsAuthCompleted(false);
    }
    setResultMsg(msg);
  };

  // 메시지 0초시 유효성 없애기 함수
  const handleTimeZero = (isZero) => {
    console.log('handleTimeZero isZero : ', isZero);
    setIsTimeZero(isZero);
    if (isZero) {
      setRandomCode(''); // 타이머가 0이면 인증 코드를 무효화
      console.log('setRandomCode? : ', randomCode);
      setIsUsefulRandomCode(false); // 회원 가입 비활성화
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
