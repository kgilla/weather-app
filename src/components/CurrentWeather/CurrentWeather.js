import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = (props) => {
  const image = props.weather.weather[0].icon;

  const degToCompass = (degrees) => {
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const val = degrees / 22.5;
    console.log(degrees);
    return arr[Math.round(val)];
  };

  return (
    <div id="current-weather">
      <div id="current-weather-main">
        <div id="current-weather-main-left">
          <img
            src={`http://openweathermap.org/img/wn/${image}@4x.png`}
            alt={props.weather.weather[0].description}
          />
        </div>
        <div id="current-weather-main-right">
          <h1 id="current-weather-temp">{Math.round(props.weather.temp)}°C</h1>
          <h1>Feels Like: {Math.round(props.weather.feels_like)}°C</h1>
        </div>
      </div>
      <div id="current-weather-details">
        <div className="detail-box">
          <h5 className="detail">
            {props.moment.unix(props.weather.sunrise).format("h:mm a")}
          </h5>
          <h6 className="detail-label">Sunrise</h6>
        </div>
        <div className="detail-box">
          <h5 className="detail">
            {props.moment.unix(props.weather.sunset).format("h:mm a")}
          </h5>
          <h6 className="detail-label">Sunset</h6>
        </div>
        <div className="detail-box">
          <h5 className="detail">{props.weather.clouds}%</h5>
          <h6 className="detail-label">Cloud Coverage</h6>
        </div>
        <div className="detail-box">
          <h5 className="detail">{props.weather.humidity}%</h5>
          <h6 className="detail-label">Humidity</h6>
        </div>
        <div className="detail-box">
          <h5 className="detail">{degToCompass(props.weather.wind_deg)}</h5>
          <h6 className="detail-label">Wind Direction</h6>
        </div>
        <div className="detail-box">
          <h5 className="detail">
            {Math.round(props.weather.wind_speed * 3.6)} km/h
          </h5>
          <h6 className="detail-label">Wind Speed</h6>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
