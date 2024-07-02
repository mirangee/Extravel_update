import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import '../../../scss/MyPage.scss';
import MyPageCard from './MyPageCard';
import AuthContext from '../../../../src/utils/AuthContext';
import goldMedal from '../../../assets/img/gold.png';
import silverMedal from '../../../assets/img/silver.png';
import bronzeMedal from '../../../assets/img/bronze.png';
import MyPagePointCard from './MyPagePointCard';
import MyPagePointCard2 from './MyPagePointCard2';

const MyPage = () => {
  const { email, grade, name, nation, phoneNumber } =
    useContext(AuthContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const state = location.state || {};

  // const email = state.email || 'wlqdprkrhtlvek@naver.com';
  // const phone = state.phone || '01030847234';
  // const name = state.name || '김상진';
  // const nation = state.nation || '미국(United States)';
  // const profileImage = state.profileImage || null; // 프로필 이미지 추가

  // const handleEdit = () => {
  //   navigate('/mypage/modify', {
  //     state: { email, phone, name, nation },
  //   });
  // };

  return (
    <>
      <motion.div
        className='PageBox'
        animate={{ x: 100 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <h1 className='PageHeader'>My Profile🛫</h1>
        <div className='ProfileHeader'>
          {grade === 'BRONZE' ? (
            <img src={bronzeMedal} alt='Profile' />
          ) : (
            <img
              src='https://images-ext-1.discordapp.net/external/KpbnAh7zOI7Bt793FppLAb4fVT164XaRBF7sEmIYYNQ/https/flagcdn.com/w320/us.png?format=webp&quality=lossless'
              alt='US'
            />
          )}
          <span>{name}</span>
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
          <span>Phone-Number</span>
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
          <span>관심국가</span>
          <Input
            fullWidth
            disabled
            value={nation}
            style={{ width: '700px', height: '72px' }}
          />
        </div>
        {/* <Button
          onClick={handleEdit}
          style={{
            width: '150px',
            height: '50px',
            textAlign: 'center',
            background: '#14505c',
          }}
        >
          프로필 수정하기
        </Button> */}
      </motion.div>
      <MyPageCard />
      <MyPagePointCard />
      <MyPagePointCard2 />
    </>
  );
};

export default MyPage;
