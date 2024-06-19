import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({
  inLoggedIn: false,
  name: '',
  nation: '',
  onLogout: () => {},
  onLogin: () => {},
});

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
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('NAME');
    localStorage.getItem('NATION');
    localStorage.removeItem('ROLE');
    setIsLoggedIn(false);
    setUserName('');
  };
  useEffect(() => {
    if (localStorage.getItem('NAME')) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('NAME'));
      setNation(localStorage.getItem('NATION'));
    }
  }, []);

  return (
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
