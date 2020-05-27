import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { countries } from "./countries.js";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.sendInput(this.state.input);
  }

  render() {
    return (
      <form>
        <label htmlFor="searchInput">Enter A City</label>
        <input type="text" id="searchInput" onChange={this.handleInput}></input>
        <button onClick={this.handleClick}>Enter</button>
      </form>
    );
  }
}

function TempChunk(props) {
  return (
    <div>
      <h2>{props.weather.city_name}</h2>
      <h2>{props.country}</h2>
      <h2>{props.weather.temp}</h2>
      <h2>{props.innerWeather.description}</h2>
      <img
        src={process.env.PUBLIC_URL + `/icons/${props.innerWeather.icon}.png`}
        alt="Icon Displaying Weather"
      />
    </div>
  );
}

// class WindChunk extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {}
// }

// class PrecipChunk extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {}
// }

class WeatherApp extends React.Component {
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
  }

  findCountry(weather) {
    const c = countries.find(
      (c) => c.country_code === weather.data[0].country_code
    );
    return c.country_name;
  }

  async getWeather(city) {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=c7cefb476e8e46a5a25347062fe6cdde`,
      { mode: "cors" }
    );
    const weather = await response.json();

    this.setState(() => ({
      weather: weather.data[0],
      innerWeather: weather.data[0].weather,
      country: this.findCountry(weather),
    }));

    console.log(this.state.weather);
  }

  handleInput(input) {
    this.getWeather(input);
  }

  render() {
    return (
      <div>
        <h1>Super Weather App!</h1>
        <SearchBar sendInput={this.handleInput} />
        {this.state.weather !== "" ? (
          <div>
            <TempChunk
              weather={this.state.weather}
              innerWeather={this.state.innerWeather}
              country={this.state.country}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<WeatherApp />, document.getElementById("root"));
