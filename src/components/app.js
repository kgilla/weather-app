import React, { useState, useEffect } from "react";
import Weather from "./weather";
import SearchBar from "./searchbar";
import cities from "cities.json";
import { countries } from "../data/countries.js";
require("dotenv").config();

const App = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);

  let [weather, setWeather] = useState("");
  let [location, setLocation] = useState("");
  let [input, setInput] = useState("");
  let [results, setResults] = useState([]);

  useEffect(() => {

  const findCountry = (code) => {
    const c = countries.find((c) => c.country_code === code);
    return c.country_name;
  };
    const getResultsList = () => {
      const reg = new RegExp("^" + input, "gi");
      let list = cities.filter((city) => city.name.match(reg));
      list = list.slice(0,5)
      list.forEach(city => city.countryName = findCountry(city.country))
      console.log(list)
      setResults(list);
    };
    getResultsList();
  }, [input]);

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

  const handleInput = (input) => {
    setInput(input)
  }

  const handleIndex = (index) => {
    setLocation(results[index])
    getWeather(results[index])
  }

  // const findCountry = (input) => {
  //   let country = "";
  //   let result = countries.find((country) => country.country_name === input);
  //   if (result !== undefined) {
  //     country = result;
      
  //   }
  //   return country;
  // };

  // const findCity = (input, country) => {
  //   let city = "";
  //     let result = cities.find(
  //       (city) => city.name === input
  //     );
  //     if (result !== undefined) {
  //       city = result;
  //     }
    
  //   const location = city.name + ", " + country.country_name;
  //   setLocation(location)
  //   return city;
  // };

  // const findData = (input) => {
  //   try {
  //     const inputs = input.split(/,\s/);
  //     const firstInput = inputs[0][0].toUpperCase() + inputs[0].slice(1);
  //     const secondInput = inputs[1][0].toUpperCase() + inputs[1].slice(1);
  //     const country = findCountry(secondInput);
  //     const city = findCity(firstInput, country);  
  //     getWeather(city);
  //   } catch (err) {
  //     setIsError(true);
  //   }
  // };

  return (
    <div id="main">
      <SearchBar sendInput={handleInput} results={results} sendIndex={handleIndex} />
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
