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


export const RegisterContainer = (): JSX.Element => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const axiosContext = useContext<AxiosContextType>(AxiosContext)
  const [formData, setFormData] = useReducer(formReducer, {});

  const navigate = useNavigate();


  const onSubmit = async (event) => {
    event.preventDefault();
    axiosContext.clearError();
    setIsLoading(true);
    const {firstName, lastName, email, password} = formData;

    await axiosContext.register(firstName, lastName, email, password);
    setIsLoading(false)
    if (!axiosContext.error) navigate('/main', {replace: true})
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
        <p>First name</p>
        <input onChange={onChange} name='firstName' type="text" />
      </label>
      <label>
        <p>Last name</p>
        <input onChange={onChange} name='lastName' type="text" />
      </label>
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
        <NavLink to={'/login'}>Login</NavLink>
      </div>
    </form>
    {axiosContext.error && <p style={{color: 'red'}}>{axiosContext.error}</p>}
  </div>
}