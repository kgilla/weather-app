import React, { useState } from "react";
import Weather from "./weather";
import SearchBar from "./searchbar";
import cities from "cities.json";
import { countries } from "../data/countries.js";
require("dotenv").config();

const App = () => {
  let [isError, setIsError] = useState(false);
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
      setIsError(false);
      setWeather(data);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const findCountry = (inputs) => {
    let country = "";
    inputs.forEach((input) => {
      let result = countries.find((country) => country.country_name === input);
      if (result !== undefined) {
        country = result;
      }
    });
    setLocation(country.country_name);
    console.log(location);
    return country;
  };

  const findCity = (inputs, country) => {
    let city = "";
    inputs.forEach((input) => {
      let result = cities.find(
        (city) => city.name === input && city.country === country.country_code
      );
      if (result !== undefined) {
        city = result;
      }
    });
    setLocation((location) => city.name + ", " + location);
    return city;
  };

  const databaseSearch = (inputs) => {
    const country = findCountry(inputs);
    const city = findCity(inputs, country);
    if (city) {
      return city;
    } else {
      setIsError(true);
    }
  };

  const findData = (input) => {
    try {
      const inputs = input.split(/,\s|\s/);
      const firstInput = inputs[0][0].toUpperCase() + inputs[0].slice(1);
      const secondInput = inputs[1][0].toUpperCase() + inputs[1].slice(1);
      const data = databaseSearch([firstInput, secondInput]);
      getWeather(data);
    } catch (err) {
      setIsError(true);
    }
  };

  const handleInput = (input) => {
    data === "" ? findData(input) : getWeather(data);
  };

  const handleData = (data) => {
    setData(data);
  };

  return (
    <div id="main">
      <SearchBar sendInput={handleInput} getData={handleData} />
      {isLoading ? <h1>Loading...</h1> : null}
      {isError ? (
        <div className="error">
          Sorry we could'nt find any results for that.
        </div>
      ) : null}
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
