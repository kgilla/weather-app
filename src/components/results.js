import React, { useState, useEffect } from "react";
import { countries } from "../data/countries.js";
import cities from "cities.json";

const Results = (props) => {
  let [results, setResults] = useState([]);

  const findCountry = (code) => {
    const c = countries.find((c) => c.country_code === code);
    return c.country_name;
  };

  const handleMouseDown = (e) => {
    props.getData(results[e.target.attributes[0].value]);
    props.func(e.target.textContent);
  };

  useEffect(() => {
    const getResultsList = () => {
      const reg = new RegExp("^" + props.input, "gi");
      let list = cities.filter((city) => city.name.match(reg));
      setResults(list.slice(0, 5));
    };
    getResultsList();
  }, [props.input]);

  return (
    <div id="results">
      <ol>
        {results.map((result, i) => (
          <li key={i} data={i} className="result" onMouseDown={handleMouseDown}>
            {result.name + ", " + findCountry(result.country)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
