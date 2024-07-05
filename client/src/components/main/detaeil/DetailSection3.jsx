import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import Styles from '../../../scss/DetailSection3.module.scss';
import AvChangeCard from './AvChangeCard';
import { Button, Divider } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AuthContext from '../../../utils/AuthContext';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../../assets/img/logo.png';
import axios from 'axios';
import ExchangeAccess from './ExchangeAccess';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};
const DetailSection3 = () => {
  const [open, setOpen] = useState(false);
  const { nation } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState('');
  const [data, setData] = useState({});
  const [etp, setEtp] = useState(0);
  const [to, setTo] = useState(0);
  const [page, setPage] = useState(true);
  const [balance, setBalance] = useState(0);
  const restbalance = balance - etp;
  const handleOpen = () => {
    setOpen(true);
    setPage(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { exchangeRate, currencyCode, updateDate } = data;
  const exchangeFee = (exchangeRate * 0.0175).toFixed(2);
  const discounted = (exchangeFee * 0.1).toFixed(2);
  const finalRate = (
    parseFloat(exchangeRate) + parseFloat(discounted)
  ).toFixed(2);
  const amount = (1000 / finalRate).toFixed(2);
  const history = {
    nation,
    currencyCode,
    finalRate,
    etp,
    to,
  };

  useEffect(() => {
    if (nation) {
      const getData = async () => {
        const response = await axios.get(
          `http://localhost:8181/api/rate/currency/exchange?nation=${nation}`,
        );
        setData(response.data);
        setFlag(response.data.nation.flag);
      };
      const getWallet = async () => {
        const email = localStorage.getItem('EMAIL');
        const response = await axios.get(
          `http://localhost:8181/api/wallet?email=${email}`,
        );
        setBalance(response.data);
      };
      getData();
      getWallet();
    }
  }, [nation]);
  function removeInvalidChars(str) {
    return str.replace(/ï»¿/g, '');
  }
  const exChangeHandler = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);
      setEtp(numericValue);
      const convertedValue = Number(
        (numericValue / finalRate).toFixed(2),
      );
      setTo(convertedValue);
      setError(false);
    } else {
      setError(true);
    }
  };
  const reverseExChangeHandler = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);
      setTo(numericValue);
      const convertedValue = Number(
        (numericValue * finalRate).toFixed(2),
      );
      setEtp(convertedValue);
      setError(false);
    } else {
      setError(true);
    }
  };
  const pageHandler = (e) => {
    if (restbalance < 0) {
      alert('보유 ETP 포인트가 부족합니다.');
      return;
    }
    setPage(!page);
  };
  const initState = () => {
    setEtp(0);
    setTo(0);
    setError(false);
  };
  return (
    <div className={Styles.box}>
      <AvChangeCard />
      <Button onClick={handleOpen}>환전하기</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className={Styles.logoBox}>
              <img src={Logo} />
            </div>
            {page && (
              <>
                <div className={Styles.exChangeBox}>
                  <FormControl fullWidth error={error}>
                    <OutlinedInput
                      value={etp.toLocaleString('ko-KR')}
                      onChange={exChangeHandler}
                      onClick={initState}
                      size='large'
                      style={{
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                      endAdornment={
                        <InputAdornment position='end'>
                          <div
                            className={Styles.currencyCode}
                          >
                            ETP
                          </div>
                        </InputAdornment>
                      }
                    />
                    {error && (
                      <FormHelperText>
                        숫자만 입력할 수 있습니다.
                      </FormHelperText>
                    )}
                  </FormControl>
                  <div className={Styles.calBox}>
                    <div className={Styles.calContents}>
                      <div className={Styles.result}>
                        <RadioButtonUncheckedIcon />
                        <p className={Styles.charge}>
                          {exchangeFee} ETP/{currencyCode}
                        </p>
                      </div>
                      <p className={Styles.explane}>
                        환전 수수료
                      </p>
                    </div>
                    <div className={Styles.calContents}>
                      <div className={Styles.result}>
                        <RadioButtonUncheckedIcon />
                        <p className={Styles.charge}>
                          {discounted} ETP/{currencyCode}
                        </p>
                      </div>
                      <p className={Styles.explane}>
                        환율 우대
                      </p>
                    </div>
                    <div className={Styles.calContents}>
                      <div className={Styles.result}>
                        <AddCircleOutlineIcon />
                        <p className={Styles.charge}>
                          {discounted} ETP/{currencyCode}
                        </p>
                      </div>
                      <p className={Styles.explane}>
                        총 수수료
                      </p>
                    </div>
                    <Divider
                      sx={{
                        borderBottomWidth: 2,
                        border: '1px solid black',
                        marginBottom: '10px',
                      }}
                    />
                    <div className={Styles.calContents}>
                      <div className={Styles.result}>
                        <DragHandleIcon />
                        <p className={Styles.chargeP}>
                          {finalRate} ETP/{currencyCode}
                        </p>
                      </div>
                      <p className={Styles.explaneP}>
                        적용 환율
                      </p>
                    </div>
                    <div className={Styles.calContents}>
                      <div className={Styles.result}>
                        <CloseIcon />
                        <p className={Styles.charge}>
                          {amount} {currencyCode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.wallet}>
                    <p>
                      보유 ETP :{' '}
                      {balance.toLocaleString('ko-KR')}ETP
                    </p>
                    <p>
                      환전 후 잔액 :{' '}
                      {restbalance.toLocaleString('ko-KR')}
                      ETP
                    </p>
                  </div>

                  <OutlinedInput
                    style={{
                      width: '100%',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                    value={to.toLocaleString('en')}
                    onChange={reverseExChangeHandler}
                    onClick={initState}
                    endAdornment={
                      <InputAdornment
                        style={{ marginRight: '20px' }}
                        position='end'
                      >
                        <img
                          className={Styles.icon}
                          src={removeInvalidChars(
                            atob(flag),
                          )}
                        />
                        <div
                          className={Styles.currencyCode}
                        >
                          {data.currencyCode}
                        </div>
                      </InputAdornment>
                    }
                  />
                  <div className={Styles.info}>
                    매매 기준율 : {exchangeRate}{' '}
                    <p>{updateDate} 기준</p>
                  </div>
                </div>

                <div className={Styles.buttonBox}>
                  <Button
                    variant='contained'
                    className={Styles.cancleBt}
                    onClick={handleClose}
                  >
                    취소
                  </Button>
                  <Button
                    variant='contained'
                    className={Styles.exchangeBt}
                    onClick={pageHandler}
                  >
                    환전
                  </Button>
                </div>
              </>
            )}
            {!page && (
              <ExchangeAccess
                data={history}
                close={handleClose}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DetailSection3;
