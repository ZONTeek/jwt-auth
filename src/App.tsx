import React from 'react';
import './App.css'
import { Navigation } from './Navigation';
import { AuthProvider } from './Auth/AuthContext';
import { AxiosProvider } from './API/Axios';

export const App = (): JSX.Element => {

  return <div className={'wrapper'}>
    <AuthProvider>
      <AxiosProvider>
        <Navigation />
      </AxiosProvider>
    </AuthProvider>
  </div>
}