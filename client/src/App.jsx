import React from 'react';
import {
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/main/ScrollToTopButton';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import { AuthContextProvider } from './utils/AuthContext';
import Login from './components/user/Login';
import FindIDandPassword from './components/user/FindIDandPassword';
import MainIntro from './components/main/intro/MainIntro';
import MainDetail from './components/main/detaeil/MainDetail';
import NaverLoginHandler from './components/user/NaverLoginHandler';
import NaverNews from './components/main/detaeil/NaverNews';
import FlightOffer from './components/flight/FlightOffer';
import MyPage from './components/main/detaeil/MyPage';
import MyPageModify from './components/main/detaeil/MyPageModify';
import { Switch } from '@mui/material';
import NaverShopping from './components/user/NaverShopping';
import DailyRatesTable from './components/main/detaeil/DailyRatesTable';
import RealTimeExchanges from './components/main/detaeil/RealTimeExchanges';

const App = () => {
  const location = useLocation();
  const isFlight = location.pathname !== '/flight';
  return (
    <>
      <AuthContextProvider>
        {isFlight && <Header />}
        <Routes>
          <Route path='/' element={<MainIntro />} />
          <Route path='/main' element={<MainDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/flight' element={<FlightOffer />} />
          <Route
            path='/login/FindIDandPassword'
            element={<FindIDandPassword />}
          />

          <Route
            path='/user/auth/naver'
            element={<NaverLoginHandler />}
          />
          <Route
            path='/oauth/kakao'
            element={<KakaoLoginHandler />}
          />
          <Route
            path='/main/news'
            element={<NaverNews />}
          ></Route>

          <Route
            path='api/v1/shopping'
            element={<NaverShopping />}
          ></Route>
          <Route path='/mypage' element={<MyPage />} />
          <Route
            path='/main/exrates'
            element={<RealTimeExchanges />}
          />
          <Route
            path='/mypage/modify'
            element={<MyPageModify />}
          />
        </Routes>

        {isFlight && <Footer />}
        {/* <RealTimeExchanges /> */}
        {/* <DailyRatesTable /> */}
        <ScrollToTopButton />
      </AuthContextProvider>
    </>
  );
};

export default App;
