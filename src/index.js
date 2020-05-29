import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import { countries } from "./countries.js";
import cities from "cities.json";

const Header = () => {
  return (
    <header id="top-banner">
      <h1>4-Cast</h1>
    </header>
  );
};

const Results = (props) => {
  const getResultsList = () => {
    const reg = new RegExp("^" + props.input, "gi");
    let list = cities.filter((city) => city.name.match(reg));
    return list.slice(0, 5);
  };

  const findCountry = (code) => {
    const c = countries.find((c) => c.country_code === code);
    return c.country_name;
  };

  const handleClick = (e) => {
    props.func(e.target.textContent);
  };

  const resultList = getResultsList();

  return (
    <div id="results">
      <ol>
        {resultList.map((result, i) => (
          <li key={i} className="result" onClick={handleClick}>
            {result.name + ", " + findCountry(result.country)}
          </li>
        ))}
      </ol>
    </div>
  );
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleError() {
    console.log("error");
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.input !== "") {
      this.props.sendInput(this.state.input);
    } else {
      this.logError();
    }
  }

  handleInputChange(input) {
    this.setState(() => ({
      input: input,
    }));
  }

  render() {
    return (
      <form id="search-bar" autoComplete="off">
        <label htmlFor="searchInput">Whats The Weather Like In...</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Enter a city"
          onChange={this.handleInput}
          value={this.state.input}
        ></input>
        <button onClick={this.handleClick}>Search</button>
        {this.state.input.length >= 1 ? (
          <Results input={this.state.input} func={this.handleInputChange} />
        ) : null}
      </form>
    );
  }
}

const TempChunk = (props) => {
  return (
    <div id="temp-chunk">
      <h2>{props.innerWeather.description}</h2>
      <div id="temp-main">
        <img
          src={process.env.PUBLIC_URL + `/icons/${props.innerWeather.icon}.png`}
          alt="Icon Displaying Weather"
        />
        <h2>{Math.round(props.weather.temp)}&deg;C</h2>
      </div>
      <h2>Feels Like: {Math.round(props.weather.app_temp)}&deg;C</h2>
    </div>
  );
};

const DetailsChunk = (props) => {
  return (
    <div id="details-chunk">
      <h2>Precipitation: {props.weather.precip} mm/hr</h2>
      <h2>Cloud Coverage: {props.weather.clouds}%</h2>
      <h2>Humidity: {props.weather.rh}%</h2>
      <h2>Wind: {Math.round(props.weather.wind_spd * 3.6)} km/h</h2>
      <h2>Wind Direction: {props.weather.wind_cdir_full}</h2>
    </div>
  );
};

const Weather = (props) => {
  return (
    <div id="weather-card">
      <header id="weather-header">
        <h2>
          {props.weather.city_name}, {props.country}
        </h2>
        <h2>{props.weather.datetime.slice(0, -3)}</h2>
      </header>
      <div id="weather-details">
        <TempChunk
          weather={props.weather}
          innerWeather={props.innerWeather}
          country={props.country}
        />
        <DetailsChunk weather={props.weather} />
      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      innerWeather: "",
      country: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.findCountry = this.findCountry.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  findCountry(weather) {
    const c = countries.find(
      (c) => c.country_code === weather.data[0].country_code
    );
    return c.country_name;
  }

  updateState(weather) {
    this.setState(() => ({
      weather: weather.data[0],
      innerWeather: weather.data[0].weather,
      country: this.findCountry(weather),
    }));
  }

  async getWeather(city) {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=c7cefb476e8e46a5a25347062fe6cdde`,
      { mode: "cors" }
    );
    const weather = await response.json();
    this.updateState(weather);
    console.log(this.state.weather);
  }

  handleInput(input) {
    this.getWeather(input);
  }

  render() {
    return (
      <div id="main">
        <Header />
        <SearchBar sendInput={this.handleInput} />
        {this.state.weather !== "" ? (
          <Weather
            weather={this.state.weather}
            innerWeather={this.state.innerWeather}
            country={this.state.country}
          />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
