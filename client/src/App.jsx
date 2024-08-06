import React, { Children, useContext } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/main/ScrollToTopButton';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import AuthContext, {
  AuthContextProvider,
} from './utils/AuthContext';
import Login from './components/user/Login';
import FindIDandPassword from './components/user/FindIDandPassword';
import MainIntro from './components/main/intro/MainIntro';
import MainDetail from './components/main/detaeil/MainDetail';
import NaverLoginHandler from './components/user/NaverLoginHandler';
import NaverNews from './components/main/detaeil/NaverNews';
import FlightOffer from './components/flight/FlightOffer';
import MyPage from './components/user/my_page/MyPage';
import MyPageModify from './components/user/my_page/MyPageModify';
import NaverShopping from './components/user/NaverShopping';
import RealTimeExchanges from './components/main/detaeil/RealTimeExchanges';
import LoginPhoneNumber from './components/user/LoginPhoneNumber';
const IsLoginHandler = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return <Navigate to='/main/exrates' />;
  }
  return children;
};
const IsLoggedInHandler = ({ children }) => {
  const name = localStorage.getItem('NAME');
  if (!name) {
    return <Navigate to='/login' />;
  }
  return children;
};

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const handleLayout = () => {
    if (
      location.pathname !== '/login' &&
      location.pathname !== '/flight' &&
      location.pathname !== '/login/sns'
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <AuthContextProvider>
        {handleLayout() && <Header />}
        <Routes>
          <Route
            path='/'
            element={
              <IsLoginHandler>
                <MainIntro />
              </IsLoginHandler>
            }
          />
          <Route
            path='/main'
            element={
              <IsLoggedInHandler>
                <MainDetail />
              </IsLoggedInHandler>
            }
          />
          <Route
            path='/login'
            element={
              <IsLoginHandler>
                <Login />
              </IsLoginHandler>
            }
          />
          <Route
            path='/login/sns'
            element={<LoginPhoneNumber />}
          />
          <Route
            path='/flight'
            element={
              <IsLoggedInHandler>
                <FlightOffer />
              </IsLoggedInHandler>
            }
          />
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
            element={
              <IsLoggedInHandler>
                <NaverNews />
              </IsLoggedInHandler>
            }
          ></Route>

          <Route
            path='package/v1/shopping'
            element={<NaverShopping />}
          ></Route>
          <Route
            path='/mypage'
            element={
              <IsLoggedInHandler>
                <MyPage />
              </IsLoggedInHandler>
            }
          />
          <Route
            path='/main/exrates'
            element={
              <IsLoggedInHandler>
                <RealTimeExchanges />
              </IsLoggedInHandler>
            }
          />
          <Route
            path='/mypage/modify'
            element={
              <IsLoggedInHandler>
                <MyPageModify />
              </IsLoggedInHandler>
            }
          />
        </Routes>

        {handleLayout() && <Footer />}
        {/* <RealTimeExchanges /> */}
        <ScrollToTopButton />
      </AuthContextProvider>
    </>
  );
};

export default App;
