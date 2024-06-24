import React, { useRef, useState } from 'react';
import styles from '../../../scss/ChargeModal.module.scss';
import { BsXLg } from 'react-icons/bs';
import goldMedal from '../../../assets/img/gold.png';
import silverMedal from '../../../assets/img/silver.png';
import bronzeMedal from '../../../assets/img/bronze.png';
import axios from 'axios';

const ChargeModal = ({ setModalOpen }) => {
  const modalBackground = useRef();
  const [text, setText] = useState('');
  const [calculatedNumber, setCalculatedNumber] =
    useState('');
  const [chargePoint, setChargePoint] = useState('');

  const userGrade = 'gold';

  const getMultiplier = (grade) => {
    switch (grade) {
      case 'bronze':
        return 1.001;
      case 'silver':
        return 1.002;
      case 'gold':
        return 1.003;
      default:
        return 1.001;
    }
  };

  const getPointMultiplier = (grade) => {
    switch (grade) {
      case 'bronze':
        return 0.001;
      case 'silver':
        return 0.002;
      case 'gold':
        return 0.003;
      default:
        return 0.001;
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const numberValue = Number(value.replace(/,/g, ''));

    if (!isNaN(numberValue)) {
      if (numberValue >= 0 && numberValue <= 100000000) {
        const formattedNumber =
          numberValue.toLocaleString();
        setText(formattedNumber);

        const pointMultiplier =
          getPointMultiplier(userGrade);
        const calculated = (
          numberValue * pointMultiplier
        ).toLocaleString('ko-KR');
        setCalculatedNumber(calculated);

        const multiplier = getMultiplier(userGrade);
        const chargePointValue = (
          numberValue * multiplier
        ).toLocaleString('ko-KR');
        setChargePoint(chargePointValue);
      } else {
        alert('1억 원 이하만 충전 가능합니다.');
        setText('');
        setCalculatedNumber('');
        setChargePoint('');
      }
    } else {
      alert('숫자와 쉼표(,)만 입력 가능합니다.');
      setText('');
      setCalculatedNumber('');
      setChargePoint('');
    }
  };

  const handleClose = (e) => {
    if (e.target === modalBackground.current) {
      setModalOpen(false);
    }
  };

  // 카카오 페이 결제 관련 함수
  let tid = 0; // tid를 담는 변수 선언

  const confirmPayment = async () => {
    try {
      console.log(tid);
      const res = await axios.post(
        'http://localhost:8181/payment/confirm/' + tid,
      );
      if (res.status === 200) {
        console.log(res.data);
        const result = res.data.status;
        switch (result) {
          case 'SUCCESS':
            alert('ET 포인트 충전이 완료되었습니다.');
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
      } else {
        // 결제 실패 시 새로운 페이지로 이동하며 상태 전달
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
      'width=500,height=600',
    );

    const paymentCheck = setInterval(() => {
      if (popup.closed) {
        clearInterval(paymentCheck);
        confirmPayment();
        // alert('ET 포인트 충전이 완료되었습니다.');
        // 필요한 후속 작업 수행
      }
    }, 1000);
  };

  const payHandler = async () => {
    console.log('충전하기 버튼이 클릭됨!');
    try {
      const res = await axios.post(
        'http://localhost:8181/payment/ready',
        {
          id: 21,
          price: text.replace(/,/g, ''),
          itemName: 'ET 포인트',
        },
      );
      console.log(res);
      console.log(res.data.tid);
      tid = res.data.tid;
      console.log(res.data.next_redirect_pc_url);
      if (res.status === 200) {
        openPaymentPopup(res.data.next_redirect_pc_url);
      }
    } catch {
      console.log('결제 진행 중 오류가 발생했습니다');
    }
  };

  return (
    <div
      className={styles.modalContainer}
      ref={modalBackground}
      onClick={handleClose}
    >
      <div className={styles.modalContent}>
        <BsXLg
          className={styles.modalCloseBtn}
          onClick={() => setModalOpen(false)}
        />

        <h1>ETP 충전하기</h1>
        <h5>ExTravel Point</h5>

        <div className={styles.chargeTable}>
          <div className={styles.tableHeader}>
            <div className={styles.grade}>등급</div>
            <div className={styles.criteria}>기준</div>
            <div className={styles.benefit}>혜택</div>
          </div>
          <div className={styles.goldGrade}>
            <div>
              <img src={goldMedal} alt='Gold Medal' />
            </div>
            <div className={styles.money}>
              포인트 충전 누적 금액
              <br />
              <strong> 1천만 원</strong> 이상
            </div>
            <div>
              포인트 충전 금액의
              <br />
              <strong>0.3% </strong>적립
            </div>
          </div>
          <div className={styles.silverGrade}>
            <div>
              <img src={silverMedal} alt='Silver Medal' />
            </div>
            <div className={styles.money}>
              포인트 충전 누적 금액
              <br />
              <strong>5백만 원 </strong>이상
            </div>
            <div>
              포인트 충전 금액의
              <br />
              <strong>0.2% </strong>적립
            </div>
          </div>
          <div className={styles.bronzeGrade}>
            <div>
              <img src={bronzeMedal} alt='Bronze Medal' />
            </div>
            <div className={styles.money}>
              <strong>회원가입한 모든 회원</strong>
            </div>
            <div>
              포인트 충전 금액의
              <br />
              <strong>0.1%</strong> 적립
            </div>
          </div>
        </div>

        <div className={styles.currentMoney}>
          보유 포인트
          <div className={styles.currentMoneyInput}>P</div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.chargeAmount}>
            <div className={styles.chargeAmountTitle}>
              충전 금액
            </div>
            <div className={styles.chargeInput}>
              <div>
                충전할 금액을 입력하세요.(1000원 이상 충전
                가능)
              </div>
              <input
                type='text'
                value={text}
                onChange={handleChange}
              />
              원 <br />
            </div>

            <div className={styles.upPoint}>
              + 적립 포인트
            </div>
            <div className={styles.pointContainer}>
              <div className={styles.plusPoint}>
                {calculatedNumber}{' '}
              </div>{' '}
              P
            </div>

            <div className={styles.explain}>
              홍길동 님의 등급은 {userGrade}입니다.
              <br />
              포인트 충전 금액의 0.3%가 적립됩니다.
            </div>
            <div className={styles.total}>
              = {chargePoint} P
            </div>
          </div>

          <div className={styles.totalAmount}>
            <div className={styles.totalAmountTitle}>
              충전 후 예상 포인트
            </div>
            <div className={styles.totalAmountInput}>P</div>
            <button
              className={styles.chargeBtn}
              onClick={payHandler}
            >
              충전하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeModal;
