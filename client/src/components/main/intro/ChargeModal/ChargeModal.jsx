import styles from '../../../../scss/ChargeModal.module.scss';
import { BsXLg } from 'react-icons/bs';
import ChargeTable from './ChargeTable';
import ChargeInfo from './ChargeInfo';
import ChargeResult from './ChargeResult';
import { useEffect, useState } from 'react';
import Pending from './Pending';

const ChargeModal = ({ toggle, modalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [payResult, setPayResult] = useState(false);
  const [pointInfo, setPointInfo] = useState({
    etPoint: 0,
    plusPoint: 0,
    amount: 0,
  });
  useEffect(() => {
    setPayResult(false);
    setPointInfo({
      etPoint: 0,
      plusPoint: 0,
      amount: 0,
    });
  }, []);
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <BsXLg
            className={styles.modalCloseBtn}
            onClick={toggle}
          />
          <h1>ETP 충전하기</h1>
          <h5>ExTravel Point</h5>
          {!payResult && !loading && <ChargeTable />}
          {!payResult && !loading && (
            <ChargeInfo
              setLoading={setLoading}
              setPointInfo={setPointInfo}
              setPayResult={setPayResult}
            />
          )}
          {modalOpen && loading && <Pending />}
          {payResult && (
            <ChargeResult
              pointInfo={pointInfo}
              setPayResult={setPayResult}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChargeModal;
