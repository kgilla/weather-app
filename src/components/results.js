import React from "react";

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
    </div>
  );
};

export default Results;
