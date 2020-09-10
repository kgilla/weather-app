import React from "react";
import CurrentWeather from "./currentWeather";

const Weather = (props) => {
  return (
    <div id="weather">
      <CurrentWeather weather={props.weather.current} />
      {/* <HourlyWeather weather={props.weather.hourly}/>
      <DailyWeather weather={props.weather.current}/> */}
    </div>
  );
};

export default Weather;
