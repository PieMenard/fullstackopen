import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import RenderCountries from './components/RenderCountries'

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  //const [weather, setWeather] = useState([]); 
  
  
  //a new array that is a copy of countries
  const [countriesToShow, setCountriesToShow] = useState(countries);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      //setCountriesToShow(response.data);
    });
  }, []);

  /*useEffect(() => {
    const API_KEY =  process.env.REACT_APP_API_KEY
    const city = "London";
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}`).then((response) => {
      setWeather(response.data);
      //setCountriesToShow(response.data);
    });
  }, []);*/
  
  const handleFilterChange = (event) => {
    const search = event.target.value;
    setNewFilter(search);
    setCountriesToShow (countries.filter( (country) => country.name.common.toLowerCase().includes(search.toLowerCase())));
  }

    return (
    <div>
      <Filter filter = {newFilter} handleFilter = {handleFilterChange} />
      
      <RenderCountries countries = {countriesToShow} search = {newFilter} setCountriesToShow = {setCountriesToShow}/>
    </div>
  )
  
}

export default App;
