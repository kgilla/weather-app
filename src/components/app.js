import React, { useState } from "react";
import Weather from "./weather";
import SearchBar from "./searchbar";
require("dotenv").config();

const App = () => {
  let [weather, setWeather] = useState("");
  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let [location, setLocation] = useState("");

  const getWeather = async (city) => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    setWeather(data);
  };

  const handleInput = (input) => {
    setLocation(input);
    getWeather(data);
  };

  const handleData = (data) => {
    setData(data);
  };

  return (
    <div id="main">
      <SearchBar sendInput={handleInput} getData={handleData} />
      {isLoading ? <h1>Loading...</h1> : null}
      {weather !== "" ? (
        <Weather weather={weather} location={location} />
      ) : null}
    </div>
  );
};

export default App;
