import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "./App.css";
import Card from "./Card";

function App() {
  const API_KEY = 'f50c3f2125830d5edd9c58a0955fa928';
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherData = async () => {
    if (!search) {
      alert("Please enter a city name");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setWeatherData([...weatherData, response.data]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App.</h1>
      <div className="search">
        <div className="search-bar">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your city"
          />
        </div>
        <Button onClick={getWeatherData}>Search</Button>
      </div>
      <div className="weather-cards">
        {weatherData.map((data, index) => (
          <Card
            cityName={data.name}
            cityState={data.weather[0].description}
            cityTemp={((data.main.temp - 273.15)).toFixed(2) + "°C"}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
