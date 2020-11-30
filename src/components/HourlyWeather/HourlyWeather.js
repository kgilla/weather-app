import React from "react";
import "./HourlyWeather.css";

const HourlyWeather = (props) => {
  let weather = props.weather.filter((_, i) => i % 3 === 0);
  weather = weather.slice(0, 7);

  return (
    <div className="forecast-grid">
      {weather.map((hour, i) => (
        <div className="forecast-grid-item" key={i}>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">
              {props.moment.unix(hour.dt).tz(props.timezone).format("h a")}
            </h5>
            <h6 className="forecast-detail-label">
              {props.moment.unix(hour.dt).tz(props.timezone).format("D [/] M")}
            </h6>
          </div>

          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={hour.weather[0].description}
          />
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">{Math.round(hour.temp)}°</h5>
            <h6 className="forecast-detail-label">Temp</h6>
          </div>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">
              {Math.round(hour.wind_speed * 3.6)} km/h
            </h5>
            <h6 className="forecast-detail-label">Wind</h6>
          </div>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">{Math.round(hour.pop * 100)}%</h5>
            <h6 className="forecast-detail-label">P.O.P.</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeather;
