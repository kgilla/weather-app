import React from "react";

const TempChunk = (props) => {
  return (
    <div id="temp-chunk">
      <h2>{props.innerWeather.description}</h2>
      <div id="temp-main">
        <img
          src={process.env.PUBLIC_URL + `/icons/${props.innerWeather.icon}.png`}
          alt="Icon Displaying Weather"
        />
        <h2>{Math.round(props.weather.temp)}&deg;C</h2>
      </div>
      <h2>Feels Like: {Math.round(props.weather.app_temp)}&deg;C</h2>
    </div>
  );
};

export default TempChunk;
