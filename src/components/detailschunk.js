import React from "react";

const DetailsChunk = (props) => {
  return (
    <div id="details-chunk">
      <h2>Precipitation: {props.weather.precip} mm/hr</h2>
      <h2>Cloud Coverage: {props.weather.clouds}%</h2>
      <h2>Humidity: {props.weather.rh}%</h2>
      <h2>Wind: {Math.round(props.weather.wind_spd * 3.6)} km/h</h2>
      <h2>Wind Direction: {props.weather.wind_cdir_full}</h2>
    </div>
  );
};

export default DetailsChunk;
