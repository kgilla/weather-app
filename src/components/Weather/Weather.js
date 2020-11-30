import React, { useState } from "react";
import moment from "moment-timezone";
import CurrentWeather from "../CurrentWeather";
import DailyWeather from "../DailyWeather";
import HourlyWeather from "../HourlyWeather";

import "./Weather.css";

const Weather = (props) => {
  let [showDaily, setShowDaily] = useState(false);

  const handleClick = (e) => {
    e.target.attributes[0].value === "hourly"
      ? setShowDaily(false)
      : setShowDaily(true);
  };

  let description = props.weather.current.weather[0].description
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return (
    <div
      id="weather"
      className={props.showSearch === false ? "add-margin" : null}
    >
      <header id="weather-header">
        <h1 id="weather-location">
          {props.location.name + ", " + props.location.countryName}
        </h1>
        <h2 id="weather-date">
          {moment
            .unix(props.weather.current.dt)
            .tz(props.weather.timezone)
            .format("dddd, MMMM Do YYYY, h:mm a")}
        </h2>
        <h1 id="weather-description">{description}</h1>
      </header>
      <CurrentWeather weather={props.weather.current} moment={moment} />
      <div id="forecast">
        {showDaily === false ? (
          <div id="forecast-switches">
            <button
              onClick={handleClick}
              data="hourly"
              className="forecast-switch active"
            >
              Hourly
            </button>
            <button
              onClick={handleClick}
              data="daily"
              className="forecast-switch"
            >
              Daily
            </button>
          </div>
        ) : (
          <div id="forecast-switches">
            <button
              onClick={handleClick}
              data="hourly"
              className="forecast-switch"
            >
              Hourly
            </button>
            <button
              onClick={handleClick}
              data="daily"
              className="forecast-switch active"
            >
              Daily
            </button>
          </div>
        )}

        {showDaily === false ? (
          <HourlyWeather
            weather={props.weather.hourly}
            moment={moment}
            timezone={props.weather.timezone}
          />
        ) : (
          <DailyWeather
            weather={props.weather.daily}
            moment={moment}
            timezone={props.weather.timezone}
          />
        )}
      </div>
    </div>
  );
};

export default Weather;
