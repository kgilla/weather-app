import React from "react";

const DailyWeather = (props) => {
  const weather = props.weather.slice(1);
  return (
    <div className="forecast-grid">
      {weather.map((day, i) => (
        <div className="forecast-grid-item" key={i}>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">
              {props.moment.unix(day.dt).format("dddd")}
            </h5>
            <h6 className="forecast-detail-label">
              {" "}
              {props.moment.unix(day.dt).format("D[/]M")}
            </h6>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">
              {Math.round(day.temp.min)} | {Math.round(day.temp.max)} °C
            </h5>
            <h6 className="forecast-detail-label">Temp</h6>
          </div>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">
              {Math.round(day.wind_speed * 3.6)} km/h
            </h5>
            <h6 className="forecast-detail-label">Wind</h6>
          </div>
          <div className="forecast-detail-box">
            <h5 className="forecast-detail">{Math.round(day.pop * 100)}%</h5>
            <h6 className="forecast-detail-label">P.O.P.</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyWeather;
