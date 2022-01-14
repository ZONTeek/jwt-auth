import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);
const {Provider} = AuthContext;

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null
  })

  const logout = () => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false
    });
  }

  const getAccessToken = () => {
    return authState.accessToken;
  }
  return <Provider value={{authState,setAuthState,getAccessToken,logout}}>
    {children}
    </Provider>
}