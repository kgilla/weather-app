import React from "react";

const CurrentWeather = (props) => {
  const image = props.weather.weather[0].icon;

  return (
    <div id="weather-weather">
      <h1>{props.weather.weather[0].description}</h1>
      <h1>{props.weather.temp}</h1>
      <h1>Feels Like {props.weather.feels_like}</h1>
      <h1>{props.weather.clouds}% Cloud Coverage</h1>
      <h1>{props.weather.humidity}% humidity</h1>
      <h1>Wind Direction {props.weather.wind_deg} degrees</h1>
      <h1>Wind: {props.weather.wind_speed} meters per second</h1>
      <img
        src={`http://openweathermap.org/img/wn/${image}@2x.png`}
        alt={props.weather.weather[0].description}
      />
    </div>
  );
};

export default CurrentWeather;
