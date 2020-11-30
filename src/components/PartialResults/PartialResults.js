import React from "react";

const PartialResults = (props) => {
  const handleClick = (e) => {
    props.sendIndex(e.target.attributes[0].value);
  };
  return props.results.length > 0 ? (
    <div id="partial-list">
      <h1 id="partial-heading">Here are the results for "{props.input}"</h1>
      {props.results.map((result, i) => (
        <li key={i} data={i} onClick={handleClick} className="partial-result">
          {result.name + ", " + result.countryName}
        </li>
      ))}
    </div>
  ) : (
    <div id="partial-list">
      <h1 id="partial-heading">
        Seems we don't have any results for "{props.input}"
      </h1>
    </div>
  );
};

export default PartialResults;
