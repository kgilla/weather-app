import React, { useState } from "react";
import moment from "moment";
import CurrentWeather from "./currentWeather";
import DailyWeather from "./dailyWeather";
import HourlyWeather from "./hourlyWeather";

const Weather = (props) => {
  let [showDaily, setShowDaily] = useState(false);

  const handleClick = (e) => {
    e.target.attributes[0].value === "hourly"
      ? setShowDaily(false)
      : setShowDaily(true);
  };
  return (
    <div id="weather">
      <header id="weather-header">
        <h1 id="weather-location">{props.location}</h1>
        <h2 id="weather-date">
          {moment
            .unix(props.weather.current.dt)
            .format("dddd, MMMM Do YYYY, h:mm a")}
        </h2>
        <h1 id="weather-description">
          {props.weather.current.weather[0].description}
        </h1>
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
          <HourlyWeather weather={props.weather.hourly} moment={moment} />
        ) : (
          <DailyWeather weather={props.weather.daily} moment={moment} />
        )}
      </div>
    </div>
  );
};

export default Weather;
