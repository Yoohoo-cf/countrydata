import React from 'react';
import {useState, useEffect} from 'react';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
const api_key = process.env.REACT_APP_API_KEY;

function Country({country}) {

  const [ weather, setWeather ] = useState('');

  useEffect(() => {
            async function fetchWeather() {
              const url = `${weatherUrl}?q=${country.capital}
              &appid=${api_key}&units=metric`
              const res = await fetch(url);
              const data = await res.json();
              setWeather(data)
            }
            fetchWeather();
        }, [country])

  return (
    <div className="country_info_wrapper" key={country.name}>
       <h2>{country.name.common}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h4>Languages: </h4>
        <ul key={country.cca3} style={{marginLeft: '2em', fontStyle: 'italic'}}>
            {Object.values(country.languages).map( lang =>
              <li key={lang}>{lang}</li>
                )}
        </ul>
        <img src={country.flags.png} alt={'Flag of ${country.name.common} flag'} />
        <section className='weather'>
          {weather && (
            <>
            <h3>Weather in {country.capital}</h3>
            <p>temperature: {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                     alt="weather icon"/>
            <p>wind: {weather.wind.speed}  m/s</p>
            </>
          )}
        </section>
    </div>
  )
}

export default Country