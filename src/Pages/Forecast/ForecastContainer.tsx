import React, { useContext, useEffect, useState } from 'react';
import {ForecastComponent} from './ForecastComponent';
import {AxiosContext} from '../../API/Axios';
import { AxiosContextType } from '../../types/types';

export const ForecastContainer = (): JSX.Element => {

  return <ForecastComponent />
}


//cat show


// import React, { useContext, useEffect, useState } from 'react';
// import {ForecastComponent} from './ForecastComponent';
// import {AxiosContext} from '../../API/Axios';
// import { AxiosContextType } from '../../types/types';
//
// export const ForecastContainer = (): JSX.Element => {
//   const [image, setImage] = useState();
//   const axiosContext = useContext<AxiosContextType>(AxiosContext)
//
//   const getImage = async () => {
//     const cat = await axiosContext.getCat();
//     setImage(cat);
//   }
//
//   useEffect(()=> {
//     getImage();
//   }, [])
//
//   return <div>
//     <img src={image} style={{width: 300, height: 300}}/>
//   </div>
//   // return <ForecastComponent />
// }