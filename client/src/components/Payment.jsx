import PortOne from '@portone/browser-sdk/v2';
import React from 'react';
import {
  STORE_ID,
  CHANNEL_KEY,
} from '../config/pay-config';

const Payment = () => {
  const payHandler = async () => {
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: 'store-acfe4a4a-bd6f-4100-8f6c-6fe1f4221a3f',
      // 채널 키 설정
      channelKey:
        'channel-key-f1f3f36c-bd4a-4a12-b1a6-67927fb7a5cf',
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: '나이키 와플 트레이너 2 SD',
      totalAmount: 1000,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
    });

    if (response.code != null) {
      // 오류 발생
      return alert(response.message);
    } else {
      notified(paymentId);
    }
  };

  return (
    <div>
      <button onClick={payHandler}>결제하기</button>
    </div>
  );
};

export default Payment;
