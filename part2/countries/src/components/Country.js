import { useState, useEffect } from 'react'
import axios from 'axios';

const Country = ({ country, toggleDisplay, setCountriesToShow }) => {
  const [weather, setWeather] = useState([]); 
  useEffect(() => {
    const API_KEY =  process.env.REACT_APP_API_KEY
    const city = country.capital;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then((response) => {
      setWeather(response.data);
      //setCountriesToShow(response.data);
    });
  }, []);
  
  if (toggleDisplay)  
    return (
        <div>
              <h1>{country.name.official}</h1>
                  <div>Capital: {country.capital}</div>
                  <div>Area: {country.area} km²</div>
                  <h3>Languages:</h3>
                  <ul>
                      {/* convert the list of properties (languages) into an array so we can map it to a list*/}
                      { Object.values(country.languages).map((language) => (
                      <li key={language}>{language}</li>
                      ))} 
                  </ul>
                  <img src={country.flags.png} alt={country.flags.alt} />
                  <h3>Weather in {country.capital}</h3>
                  {weather.main && (//checks if weather.main is null (React conditional rendering)
                    <>
                      <div> Temperature: {weather.main.temp} °C</div>
                      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                      <div> Wind: {weather.wind.speed} km/s</div>
                    </>
                  )}
          </div>
      )
  else
    return (
            <div>
              {country.name.common}{" "}
              <button onClick={() => setCountriesToShow([country])}>show</button>
            </div> 
            
    )
  }

  export default Country