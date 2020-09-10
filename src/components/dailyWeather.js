import React from "react";

const DailyWeather = (props) => {
  const weather = props.weather.slice(1);
  return (
    <div id="daily-weather-grid">
      {weather.map((day, i) => (
        <div className="day-box" key={i}>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <h1> {props.moment.unix(day.dt).format("dddd, D[/]M")}</h1>
          <h1>{day.temp.day} °C</h1>
          <h1>Low: {day.temp.min} °C</h1>
          <h1>High: {day.temp.max} °C</h1>
          <h1>Wind: {day.wind_speed} mps</h1>
          <h1>POP: {day.pop}</h1>
        </div>
      ))}
    </div>
  );
};

export default DailyWeather;
