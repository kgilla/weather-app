import React, { useState, useEffect } from "react";
import Weather from "./weather";
import SearchBar from "./searchbar";
import Spinner from "./spinner";
import Navbar from "./navbar";
import cities from "cities.json";
import { countries } from "../data/countries.js";
require("dotenv").config();

const App = () => {
  let [showSearch, setShowSearch] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);
  let [showPartial, setShowPartial] = useState(false);
  let [weather, setWeather] = useState("");
  let [location, setLocation] = useState("");
  let [input, setInput] = useState("");
  let [results, setResults] = useState([]);
  let [selected, setSelected] = useState("");

  useEffect(() => {
    const findCountry = (code) => {
      const c = countries.find((c) => c.country_code === code);
      return c.country_name;
    };

    const getResultsList = () => {
      const reg = new RegExp("^" + input, "gi");
      let list = cities.filter((city) => city.name.match(reg)).slice(0, 5);
      list.forEach((city) => (city.countryName = findCountry(city.country)));
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
      setIsLoading(false);
      setIsError(false);
      setWeather(data);
      setShowSearch(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleInput = (input) => {
    setInput(input);
    setSelected("");
    setShowPartial(false);
  };

  const handleIndex = (index) => {
    if (showPartial === true) {
      setShowPartial(false);
    }
    setLocation(results[index]);
    getWeather(results[index]);
  };

  const handleSubmit = () => {
    if (selected) {
      setLocation(results[selected]);
      getWeather(results[selected]);
    } else if (results.length === 1) {
      setLocation(results[0]);
      getWeather(results[0]);
    } else {
      setWeather("");
      setShowPartial(true);
    }
  };

  const handleSelection = (direction) => {
    if (selected === "") {
      setSelected(0);
    } else if (direction === "down") {
      selected <= 0 ? setSelected(0) : setSelected((selected) => selected - 1);
    } else if (direction === "up") {
      selected >= results.length - 1
        ? setSelected(results.length - 1)
        : setSelected((selected) => selected + 1);
    }
  };

  const handleShowSearch = () => {
    console.log(showSearch);
    showSearch ? setShowSearch(false) : setShowSearch(true);
  };

  return (
    <div id="main">
      {showSearch ? (
        <SearchBar
          sendInput={handleInput}
          results={results}
          sendIndex={handleIndex}
          getSelection={handleSelection}
          selected={selected}
          setSelected={setSelected}
          submit={handleSubmit}
          showPartial={showPartial}
          inputValue={
            selected !== ""
              ? results[selected].name + ", " + results[selected].countryName
              : ""
          }
          setShowPartial={setShowPartial}
          hideSearch={handleShowSearch}
          weather={weather}
        />
      ) : (
        <Navbar showSearch={handleShowSearch} />
      )}

      {isLoading ? <Spinner /> : null}
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
