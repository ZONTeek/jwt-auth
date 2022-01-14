import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../Auth/AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const AxiosContext = createContext(null);
const {Provider} = AxiosContext;

export const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');

  const Axios = axios.create({baseURL: 'http://localhost:3001/api'});

  Axios.defaults.withCredentials = true;

  Axios.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
    }
    return config;
  }, err => {
    return Promise.reject(err);
  })


  const login = async (email, password) => {
    try {
      const response = await Axios.post('/login', {
        email,
        password
      });

      const {accessToken, refreshToken} = response.data;
      authContext.setAuthState({
        accessToken, refreshToken, authenticated: true
      })
    } catch (e) {
      console.log('LOGIN ERROR', e)
      setError(e.response?.data?.message)
    }
  }

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await Axios.post('/register', {
        email,
        password,
        firstName,
        lastName
      });
      const {accessToken, refreshToken} = response.data;

      authContext.setAuthState({
        accessToken, refreshToken, authenticated: true
      })
    } catch (e) {
      console.log('Register ERROR', e.response?.data?.message)
      setError(e.response?.data?.message)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await Axios.get('/me');
      const {authenticated, accessToken, refreshToken} = response.data;
      authContext.setAuthState({authenticated, accessToken, refreshToken })
    } catch (e) {
      console.log(e);
    }
  }

  const refreshAuth = (failedRequest) => {
    const data = {
      refreshToken: authContext.authState.refreshToken
    }
    const options = {
      method: 'POST',
      data,
      url: 'http://localhost:3000/api/refreshToken'
    }
    return Axios(options)
      .then(response => {
        console.log('Refreshing token')
        failedRequest.response.config.headers.Authorization =
          `Bearer ${response.data.accessToken}`
        authContext.setAuthState({
          ...authContext.authState,
          accessToken: response.data.accessToken
        })
        return Promise.resolve();
      })
      .catch(err => {
        console.log('TOKEN REFRESH ERROR', err)
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null
        })
      })
  }

  const getCat = async () => {
    try {
      const response = await Axios.post('/cat')
      return response.data;
    } catch (e) {
      setError(e.response?.data?.message);
    }
  }

  const clearError = () => {
    setError(undefined);
  }

  createAuthRefreshInterceptor(Axios, refreshAuth, {})

  return <Provider value={{Axios, error, login, register, getCat, checkAuth, clearError}}>
    {children}
  </Provider>
}