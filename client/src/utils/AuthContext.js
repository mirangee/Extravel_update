import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({
  inLoggedIn: false,
  userName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const loginHandler = (token, userName, role) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('USER_NAME', userName);
    localStorage.setItem('ROLE', role);
    setIsLoggedIn(true);
    setUserName(userName);
  };

  const logoutHandler = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('ROLE');
    setIsLoggedIn(false);
    setUserName('');
  };
  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('USER_NAME'));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        inLoggedIn: isLoggedIn,
        userName,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
