import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../../../../scss/ChargeModal.module.scss';
import AuthContext from '../../../../utils/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/host-config';

const ChargeInfo = ({
  setLoading,
  setPointInfo,
  setPayResult,
}) => {
  const { id, grade, name } = useContext(AuthContext);
  const [calculatedNumber, setCalculatedNumber] =
    useState(0);
  const [chargePoint, setChargePoint] = useState(0);
  const [text, setText] = useState(0);
  const [currentEtp, setCurrentEtp] = useState(0);
  const [countPoint, setCountPoint] = useState(0); // 충전 누적합
  const [isButtonDisabled, setIsButtonDisabled] =
    useState(true);

  useEffect(() => {
    setIsButtonDisabled(true);
    async function fetchData() {
      try {
        const response = await axios.post(
          API_BASE_URL + '/payment/pointInfo',
          { id },
        );
        setCurrentEtp(response.data.etPoint);
        setCountPoint(response.data.countPoint);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  // 카카오 페이 결제 함수
  let tid = 0;
  const confirmPayment = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + '/payment/confirm/' + tid,
      );
      if (res.status === 200) {
        console.log(res.data);
        const result = res.data.status;

        switch (result) {
          case 'SUCCESS':
            alert('ET 포인트 충전이 완료되었습니다.');
            setPayResult(true);
            console.log('보유 포인트: ', res.data.etPoint);
            console.log(
              '적립 포인트: ',
              res.data.plusPoint,
            );
            console.log('결제액: ', res.data.amount);
            setPointInfo({
              etPoint: res.data.etPoint,
              plusPoint: res.data.plusPoint,
              amount: res.data.amount,
              countPoint: res.data.countPoint,
            });
            break;
          case 'CANCELED':
            alert('결제가 취소되었습니다!');
            break;
          case 'FAILED':
            alert(
              '결제에 실패했습니다. 다시 시도해 주세요',
            );
            break;
          case 'PENDING':
            alert(
              '결제창이 닫혔습니다. 다시 시도해 주세요',
            );
            break;
        }
      }
    } catch (error) {
      console.error(
        '결제 확인 중 오류가 발생했습니다',
        error,
      );
    }
  };

  const openPaymentPopup = (popUrl) => {
    const popup = window.open(
      popUrl,
      '카카오페이 결제',
      `width=${500},height=${600},left=${400},top=${100}`,
    );

    const paymentCheck = setInterval(() => {
      if (popup.closed) {
        clearInterval(paymentCheck);
        confirmPayment();
        setLoading(false);
      }
    }, 1000);
  };

  const payHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        API_BASE_URL + '/payment/ready',
        {
          id,
          price: text,
          itemName: 'ET 포인트',
        },
      );
      tid = res.data.tid;
      if (res.status === 200) {
        openPaymentPopup(res.data.next_redirect_pc_url);
      }
    } catch {
      console.log('axios 요청 보낼 때 오류가 발생했습니다');
    }
  };

  const getMultiplier = (grade) => {
    switch (grade) {
      case 'BRONZE':
        return 1.001;
      case 'SILVER':
        return 1.002;
      case 'GOLD':
        return 1.003;
      default:
        return 1.001;
    }
  };

  const getPointMultiplier = (grade) => {
    switch (grade) {
      case 'BRONZE':
        return 0.001;
      case 'SILVER':
        return 0.002;
      case 'GOLD':
        return 0.003;
      default:
        return 0.001;
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    console.log(isButtonDisabled);
    const numberValue = Number(value.replace(/,/g, ''));

    if (numberValue >= 1000) {
      setIsButtonDisabled(false);
      console.log(isButtonDisabled);
    }

    if (!isNaN(numberValue)) {
      if (numberValue >= 0 && numberValue <= 100000000) {
        setText(numberValue);

        const pointMultiplier = getPointMultiplier(grade);
        const calculated =
          Math.round(numberValue * pointMultiplier * 100) /
          100;
        setCalculatedNumber(calculated);

        const multiplier = getMultiplier(grade);
        const chargePointValue = numberValue * multiplier;
        setChargePoint(chargePointValue);
      } else {
        alert('1억 원 이하만 충전 가능합니다.');
        setText(0);
        setCalculatedNumber(0);
        setChargePoint(0);
      }
    } else {
      alert('숫자와 쉼표(,)만 입력 가능합니다.');
      setText(0);
      setCalculatedNumber(0);
      setChargePoint(0);
    }
  };

  return (
    <>
      <div className={styles.currentMoney}>
        누적 충전 포인트
        <div className={styles.currentMoneyInput}>
          {countPoint.toLocaleString('ko-KR')}P
        </div>
      </div>
      <div className={styles.currentMoney}>
        현재 보유 포인트
        <div className={styles.currentMoneyInput}>
          {currentEtp.toLocaleString('ko-KR')}P
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.chargeAmount}>
          <div className={styles.chargeAmountTitle}>
            충전 금액
          </div>
          <div className={styles.chargeInput}>
            <div>
              충전할 금액을 입력하세요.(1,000원 이상 충전
              가능)
            </div>
            <input
              type='text'
              value={text.toLocaleString('ko-KR')}
              onChange={handleChange}
            />
            원 <br />
          </div>

          <div className={styles.upPoint}>
            + 적립 포인트
          </div>
          <div className={styles.pointContainer}>
            <div className={styles.plusPoint}>
              {calculatedNumber.toLocaleString('ko-KR')}{' '}
            </div>{' '}
            P
          </div>

          <div className={styles.explain}>
            {name} 님의 등급은 {grade}입니다.
            <br />
            포인트 충전 금액의{' '}
            {getPointMultiplier(grade) * 100 + '%'}가
            적립됩니다.
          </div>
          <div className={styles.total}>
            = {chargePoint.toLocaleString('ko-KR')} P
          </div>
        </div>

        <div className={styles.totalAmount}>
          <div className={styles.totalAmountTitle}>
            충전 후 예상 포인트
          </div>
          <div className={styles.totalAmountInput}>
            {(
              currentEtp +
              text +
              calculatedNumber
            ).toLocaleString('ko-KR')}
            P
          </div>
          <button
            className={styles.chargeBtn}
            onClick={payHandler}
            disabled={isButtonDisabled}
          >
            충전하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ChargeInfo;
