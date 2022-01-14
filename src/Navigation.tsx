import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext';
import { AxiosContext } from './API/Axios';
import { LoginContainer } from './Pages/Login/Login';
import { RegisterContainer } from './Pages/Register/Register';
import { ForecastContainer } from './Pages/Forecast/ForecastContainer';
import { AxiosContextType } from './types/types';

const PrivateRoute = ({children, authenticated}: PrivateRouteProps): JSX.Element => {
  if (authenticated) return <>{children}</>
  return <Navigate to={'/login'} />
}

export const Navigation = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const axiosContext = useContext<AxiosContextType>(AxiosContext);
  const authenticated = authContext?.authState?.authenticated;

  const checkAuth = async () => {
    setLoading(true);
    await axiosContext.checkAuth();
    setLoading(false);
  }

  useEffect(()=> {
    checkAuth();
  },[])

  if (loading) return <div></div>
  return (
        <Router>
          <Routes>
            <Route path={'/login'} element={<LoginContainer />} />
            <Route path={'/register'} element={<RegisterContainer />} />
            <Route path={'/main'} element={
              <PrivateRoute authenticated={authenticated}>
                <ForecastContainer/>
              </PrivateRoute>}
            />
          </Routes>
        </Router>
  )
}

type PrivateRouteProps = {
  children: JSX.Element;
  authenticated: boolean;
}
