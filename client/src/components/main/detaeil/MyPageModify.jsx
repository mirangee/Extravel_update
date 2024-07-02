import { Input } from '@mui/material';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../scss/MyPage.scss';
import { motion } from 'framer-motion';

const MyPageModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const [email, setEmail] = useState(
    state.email || 'wlqdprkrhtlvek@naver.com',
  );
  const [phone, setPhone] = useState(
    state.phone || '01030847234',
  );
  const [name, setName] = useState(state.name || '김상진');
  const [nation, setNation] = useState(
    state.nation || '미국(United States)',
  );
  const [profileImage, setProfileImage] = useState(null); // 상태 추가

  const handleSave = () => {
    navigate('/mypage', {
      state: { email, phone, name, nation, profileImage }, // 프로필 이미지도 네비게이션 상태에 포함
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className='PageBox'
      animate={{ x: 100 }}
      transition={{ ease: 'easeOut', duration: 2 }}
    >
      <h1 className='PageHeader'>Edit Profile🛬</h1>
      <div className='ProfileHeader'>
        {profileImage ? ( // 프로필 이미지가 있으면 보여줌
          <img src={profileImage} alt='Profile' />
        ) : (
          <img
            src='https://images-ext-1.discordapp.net/external/KpbnAh7zOI7Bt793FppLAb4fVT164XaRBF7sEmIYYNQ/https/flagcdn.com/w320/us.png?format=webp&quality=lossless'
            alt='US'
          />
        )}
        <span>{name}</span>
      </div>
      <div className='ImageUpload'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
      </div>
      <div className='EmailBox'>
        <span>Email</span>
        <Input
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '700px', height: '72px' }}
        />
      </div>
      {/* <div className='PasswordBox'>
        <span>Password</span>
        <Input
          fullWidth
          // value={phone}
          // onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '700px',
            height: '72px',
            color: 'black',
          }}
          disabled
        />
      </div> */}
      <div className='PhoneBox'>
        <span>Phone-Number</span>
        <Input
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '700px',
            height: '72px',
            color: 'black',
          }}
          disabled
        />
      </div>
      <div className='NationBox'>
        <span>관심국가</span>
        <Input
          fullWidth
          value={nation}
          onChange={(e) => setNation(e.target.value)}
          style={{ width: '700px', height: '72px' }}
        />
      </div>
      <Button
        onClick={handleSave}
        style={{
          width: '150px',
          height: '50px',
          textAlign: 'center',
          background: '#14505c',
        }}
      >
        확인
      </Button>
    </motion.div>
  );
};

export default MyPageModify;
