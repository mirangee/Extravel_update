import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import { Input } from '@mui/material';
import '../../../scss/MyPage.scss';
import AuthContext from '../../../utils/AuthContext';
import goldMedal from '../../../assets/img/gold.png';
import silverMedal from '../../../assets/img/silver.png';
import bronzeMedal from '../../../assets/img/bronze.png';
import PointHistory from './point-history/PointHistory';
import ExchangeHistory from './exchange-history/ExchangeHistory';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wallet from './wallet-exchange/Wallet';
import { API_BASE_URL } from '../../../config/host-config';

const MyPage = () => {
  const { id, email, grade, nation, onLogout } =
    useContext(AuthContext);
  const redirection = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  let medalImage = bronzeMedal;
  if (grade === 'SILVER') {
    medalImage = silverMedal;
  } else if (grade === 'GOLD') {
    medalImage = goldMedal;
  }

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/user/auth/info/${id}`,
        );
        console.log(res.data);
        setName(res.data.name);
        const part1 = res.data.phoneNumber.slice(0, 3);
        const part2 = res.data.phoneNumber.slice(3, 7);
        const part3 = res.data.phoneNumber.slice(7);
        setPhoneNumber(`${part1}-${part2}-${part3}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        '확인을 누르면 회원 탈퇴가 진행됩니다. 보유한 ETP, 외화가 포함된 모든 회원정보가 삭제되며 복구가 불가합니다.',
      )
    ) {
      axios
        .put(`${API_BASE_URL}/user/auth/remove/${id}`, {
          headers: {
            Authorization:
              'Bearer ' +
              localStorage.getItem('ACCESS_TOKEN'),
          },
        })
        .then(() => {
          localStorage.clear();
          alert('그동안 이용해주셔서 감사합니다.');
          onLogout();
          redirection('/');
          alert('메인 페이지로 이동합니다.');
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  let nationName = '';
  switch (nation) {
    case 'AE':
      nationName = '아랍에미리트';
      break;
    case 'AU':
      nationName = '호주';
      break;
    case 'BH':
      nationName = '바레인';
      break;
    case 'BN':
      nationName = '브루나이';
      break;
    case 'CA':
      nationName = '캐나다';
      break;
    case 'CH':
      nationName = '스위스';
      break;
    case 'CN':
      nationName = '중국';
      break;
    case 'DK':
      nationName = '덴마크';
      break;
    case 'EU':
      nationName = '유럽';
      break;
    case 'GB':
      nationName = '영국';
      break;
    case 'HK':
      nationName = '홍콩';
      break;
    case 'ID':
      nationName = '인도네시아';
      break;
    case 'JP':
      nationName = '일본';
      break;
    case 'KW':
      nationName = '쿠웨이트';
      break;
    case 'MY':
      nationName = '말레이시아';
      break;
    case 'NO':
      nationName = '노르웨이';
      break;
    case 'NZ':
      nationName = '뉴질랜드';
      break;
    case 'SA':
      nationName = '사우디아라비아';
      break;
    case 'SE':
      nationName = '스웨덴';
      break;
    case 'SG':
      nationName = '싱가포르';
      break;
    case 'TH':
      nationName = '태국';
      break;
    case 'US':
      nationName = '미국';
      break;
  }

  return (
    <>
      <motion.div
        className='PageBox'
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <h1 className='PageHeader'>My Profile</h1>
        <div className='ProfileHeader'>
          <img src={medalImage} alt='Profile' />
          <div>
            <p>{name}님의 등록 정보입니다</p>
            <p className='grade'>등급: {grade}</p>
          </div>
        </div>
        <div className='EmailBox'>
          <span>Email</span>
          <Input
            fullWidth
            disabled
            value={email}
            style={{ width: '700px', height: '72px' }}
          />
        </div>
        <div className='PhoneBox'>
          <span>Phone Number</span>
          <Input
            fullWidth
            disabled
            value={phoneNumber}
            style={{
              width: '700px',
              height: '72px',
              color: 'black',
            }}
          />
        </div>
        <div className='NationBox'>
          <span>관심 국가</span>
          <Input
            fullWidth
            disabled
            value={nationName}
            style={{ width: '700px', height: '72px' }}
          />
        </div>
        <Button
          onClick={handleDeleteProfile}
          style={{
            width: '150px',
            height: '50px',
            textAlign: 'center',
            background: '#14505c',
          }}
        >
          회원 탈퇴하기
        </Button>
      </motion.div>
      <Wallet />
      <ExchangeHistory />
      <PointHistory />
    </>
  );
};

export default MyPage;
