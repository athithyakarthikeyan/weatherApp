import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [weather, setWeather] =  useState(0);
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const API_KEY = "f50c3f2125830d5edd9c58a0955fa928";
  


  const detectInput = (e) =>{
    setCity(e.target.value);
  }
  
  const fetchWeather = () =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((res)=>{
      setWeather(res.data.main.temp);
      setPlace(res.data.name);
    }
  )
  }

  

  return(
    <div>
      <input placeholder='Enter your city' onChange={detectInput}></input>
      <button onClick={fetchWeather}>Find the weather!</button>
      {weather!=0 && <h1>The weather at {place} right now is {weather}°C.</h1>}
    </div>
  )
}


export default App
