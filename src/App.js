import React, { useState} from "react";
import axios from "axios";
import { Button, Input } from "antd";
import "./App.css";
import Card from "./Card";
import { motion } from "framer-motion";

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
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.3,duration:1}}>
      <h1 className="title">Weather App.</h1>
      </motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2, duration:1}}>
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
      </motion.div>
      <div className="weather-cards">
        {weatherData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.1 }}
          >
            <Card
              cityName={data.name}
              cityState={data.weather[0].description}
              cityTemp={(data.main.temp - 273.15).toFixed(2) + "°C"}
            />
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
