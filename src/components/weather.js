import React from "react";
import TempChunk from "./tempchunk";
import DetailsChunk from "./detailschunk";

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

export default Weather;
