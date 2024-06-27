import styles from '../../../../scss/ChargeModal.module.scss';
import { BsXLg } from 'react-icons/bs';
import ChargeTable from './ChargeTable';
import ChargeInfo from './ChargeInfo';
import { useState } from 'react';
import Pending from '../Pending';

const ChargeModal = ({ toggle, modalOpen }) => {
  const [loading, setLoading] = useState(false);
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
          {!loading && <ChargeTable />}
          {!loading && (
            <ChargeInfo setLoading={setLoading} />
          )}
          {modalOpen && loading && <Pending />}
        </div>
      </div>
    </>
  );
};

export default ChargeModal;
