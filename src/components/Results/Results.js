import React from "react";
import "./Results.css";

const Results = (props) => {
  const handleMouseDown = (e) => {
    props.getInput(e.target.textContent);
    props.sendIndex(e.target.attributes[0].value);
  };

  return (
    <div id="results">
      {props.results.map((result, i) =>
        props.selected === i ? (
          <li
            key={i}
            data={i}
            className="result selected"
            onMouseDown={handleMouseDown}
          >
            {result.name + ", " + result.countryName}
          </li>
        ) : (
          <li key={i} data={i} className="result" onMouseDown={handleMouseDown}>
            {result.name + ", " + result.countryName}
          </li>
        )
      )}
      <button type="button" id="inner-button" className="search-button">
        Search{" "}
      </button>
    </div>
  );
};

export default Results;
