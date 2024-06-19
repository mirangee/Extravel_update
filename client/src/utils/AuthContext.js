import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({
  inLoggedIn: false,
  name: '',
  nation: '',
  onLogout: () => {},
  onLogin: () => {},
  onChangeNation: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [nation, setNation] = useState('');
  const [email, setEmail] = useState('');

  const loginHandler = (res) => {
    // localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('NAME', res.name);
    localStorage.setItem('NATION', res.nationCode);
    localStorage.setItem('EMAIL', res.email);
    // localStorage.setItem('ROLE', role);
    setIsLoggedIn(true);
    setUserName(res.name);
    setEmail(res.email);
    setNation(res.nationCode);
  };
  const nationHandler = (nationCode) => {
    localStorage.getItem('EMAIl');
    setNation(nationCode);
  };

  const logoutHandler = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('NAME');
    localStorage.removeItem('NATION');
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('ROLE');
    setIsLoggedIn(true);
    setUserName('');
    setEmail('');
    setNation('');
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
