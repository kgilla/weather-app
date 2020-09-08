import React, { useState } from "react";
import Navbar from "./navbar";
import Weather from "./weather";
import SearchBar from "./searchbar";
import { countries } from "../data/countries.js";

const App = () => {
  let [weather, setWeather] = useState("");
  let [innerWeather, setInnerWeather] = useState("");
  let [country, setCountry] = useState("");

  const findCountry = (weather) => {
    const c = countries.find(
      (c) => c.country_code === weather.data[0].country_code
    );
    return c.country_name;
  };

  const setState = (weather) => {
    setWeather(weather.data[0]);
    setInnerWeather(weather.data[0].weather);
    setCountry(findCountry(weather));
  };

  const getWeather = async (city) => {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=c7cefb476e8e46a5a25347062fe6cdde`,
      { mode: "cors" }
    );
    const weather = await response.json();
    setState(weather);
  };

  const handleInput = (input) => {
    getWeather(input);
  };

  return (
    <div id="main">
      <Navbar />
      <SearchBar sendInput={handleInput} />
      {weather !== "" ? (
        <Weather
          weather={weather}
          innerWeather={innerWeather}
          country={country}
        />
      ) : null}
    </div>
  );
};

export default App;
