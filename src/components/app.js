import React, { useState } from "react";
import Weather from "./weather";
import SearchBar from "./searchbar";
import cities from "cities.json";
import { countries } from "../data/countries.js";
require("dotenv").config();

const App = () => {
  let [weather, setWeather] = useState("");
  let [data, setData] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [location, setLocation] = useState("");

  const getWeather = async (city) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
        { mode: "cors" }
      );
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setWeather(data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const findData = (input) => {
    let inputs = input.split(" ");
    let country = countries.find(
      (country) => country.country_name === inputs[1]
    );
    let data = cities.find(
      (city) => city.name === inputs[0] && city.country === country.country_code
    );
    getWeather(data);
  };

  const handleInput = (input) => {
    setLocation(input);
    data === "" ? findData(input) : getWeather(data);
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
      <footer>
        <a href="https://github.com/kgilla">Made by me, Kgilla</a>
      </footer>
    </div>
  );
};

export default App;
