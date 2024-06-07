import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "./App.css";

function App() {
  const API_KEY = 'f50c3f2125830d5edd9c58a0955fa928';
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <div className="search">
        <div className="search-bar"><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here" /></div>
        <Button onClick={getWeatherData}>Search</Button>
      </div>
      {weatherData && (
        <div>
          <p>{weatherData.name}</p>
          <p>{weatherData.weather[0].description}</p>
          <p>{((weatherData.main.temp - 273.15)).toFixed(2)}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
