import React, { useContext, useReducer, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AxiosContext } from '../../API/Axios';
import { AxiosContextType } from '../../types/types';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

export const LoginContainer = (): JSX.Element => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [loading, setIsLoading] = useState<boolean>(false);
  const axiosContext = useContext<AxiosContextType>(AxiosContext)
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    axiosContext.clearError();
    setIsLoading(true);
    try {
      axiosContext.clearError();
      await axiosContext.login(formData.email, formData.password)
      setIsLoading(false)
      navigate('/main');
    } catch (e) {
      console.log('err',e)
    }
  }

  const onChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    })
  }

  return <div>
    <form onSubmit={onSubmit}>
      <label>
        <p>email</p>
        <input onChange={onChange} name='email' type="text" />
      </label>
      <label>
        <p>Password</p>
        <input onChange={onChange} name='password' type="password" />
      </label>
      <div>
        <button disabled={loading}
                type="submit">
          Submit
        </button>
        <NavLink to={'/register'}>Register</NavLink>
      </div>
    </form>
    {axiosContext.error && <p style={{color: 'red'}}>{axiosContext.error}</p>}
  </div>
}