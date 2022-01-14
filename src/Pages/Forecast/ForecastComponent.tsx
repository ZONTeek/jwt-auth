import React from 'react';
import { WeatherCard } from '../../Components/WeatherCard/WeatherCard';
import './styles.css';

export const ForecastComponent = (): JSX.Element => {
  const mockData = {'coord':{'lon':38.9769,'lat':45.0328},'weather':[{'id':803,'main':'Clouds','description':'broken clouds','icon':'04n'}],'base':'stations','main':{'temp':6.09,'feels_like':6.09,'temp_min':5.57,'temp_max':6.59,'pressure':1021,'humidity':88},'visibility':10000,'wind':{'speed':0.45,'deg':274,'gust':0.89},'clouds':{'all':75},'dt':1641573625,'sys':{'type':2,'id':2012251,'country':'RU','sunrise':1641531716,'sunset':1641563890},'timezone':10800,'id':542420,'name':'Krasnodar','cod':200}

  const {description, temperature, city, windSpeed, date} = {
    description: mockData.weather[0].main,
    temperature: mockData.main.temp,
    date: mockData.dt,
    city: mockData.name,
    windSpeed: mockData.wind.speed
  }


  return <div className={'forecast'}>
    <WeatherCard
    description={description}
    temperature={temperature}
    date={date}
    city={city}
    windSpeed={windSpeed} />
  </div>
};