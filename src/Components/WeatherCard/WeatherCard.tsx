import React from 'react';
import moment from 'moment';
import { Weather } from '../../types/types';
import './styles.css'

export const WeatherCard = ({description, temperature, windSpeed, city, date}: Weather): JSX.Element => {
  return <div className={'card'}>
    <div className={'card-content'}>
      <span style={{color: '#FFF1D0', display: 'flex', flexDirection: 'row'}}>
        <i style={{marginTop: 16, marginRight: 10}} className="fas fa-city fa-2x"></i>
        <h2>{city}</h2>
      </span>
      <div className={'weather-info'}>
        <div>
          <div style={{display: 'flex'}}>
            <i style={{marginTop: 20, marginRight: 10, color: '#FFF1D0' }} className="fas fa-wind"></i>
            <h3>Wind speed {windSpeed} m/s</h3>
          </div>
          <div style={{display: 'flex'}}>
            <i style={{marginTop: 20, marginRight: 10, color: '#FFF1D0' }} className="fas fa-cloud"></i>
            <h3>{description}</h3>
          </div>
          <div style={{display: 'flex'}}>
            <i style={{marginTop: 20, marginRight: 10, color: '#FFF1D0' }} className="far fa-calendar"></i>
            <h3>{moment.unix(date).format('MMM Do YYYY')}</h3>
          </div>
        </div>
        <div className={'temperature'}>
          <p className={'fs20'}>{temperature} °C</p>
          <i style={{marginLeft: 20, marginBottom: 20, color: '#FFF1D0' }} className="fas fa-temperature-low fa-3x"></i>
        </div>
      </div>
    </div>
  </div>
}