import React from "react";

const HourlyWeather = (props) => {
  let weather = props.weather.filter((_, i) => i % 3 === 0);
  weather = weather.slice(0, 7);

  return (
    <div id="hourly-weather-grid">
      {weather.map((hour, i) => (
        <div className="hour-box" key={i}>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={hour.weather[0].description}
          />
          <h1> {props.moment.unix(hour.dt).format("h a")}</h1>
          <h1>{hour.temp} °C</h1>
          <h1>{hour.feels_like} °C</h1>
          <h1>Wind: {hour.wind_speed} mps</h1>
          <h1>POP: {hour.pop}</h1>
        </div>
      ))}
    </div>
  );
};

export default HourlyWeather;
