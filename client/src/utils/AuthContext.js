import React, { useEffect, useState } from 'react';

//컨텍스트 생성
export const AuthContext = React.createContext({
  inLoggedIn: false,
  name: '',
  nation: '',
  onLogout: () => {},
  onLogin: () => {},
});

//컨텍스트 프로바이더
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [nation, setNation] = useState('');

  const loginHandler = (res) => {
    // localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('NAME', res.name);
    localStorage.setItem('NATION', res.nationCode);
    // localStorage.setItem('ROLE', role);
    setIsLoggedIn(true);
    setUserName(res.name);
    setNation(res.nationCode);
  };

  const logoutHandler = () => {
    // localStorage.removeItem('ACCESS_TOKEN');
    // localStorage.removeItem('NAME');
    // localStorage.getItem('NATION');
    // localStorage.removeItem('ROLE');
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
  };

  //컴포넌트가 마운트될 때 로그인 상태 유지 (useEffect):
  useEffect(() => {
    if (localStorage.getItem('NAME')) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('NAME'));
      setNation(localStorage.getItem('NATION'));
    }
  }, []);

  return (
    //컨텍스트 값 -> 하위 컴포넌트에 제공
    <AuthContext.Provider
      value={{
        inLoggedIn: isLoggedIn,
        name: userName,
        nation,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
