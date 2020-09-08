import React from "react";
import { countries } from "../data/countries.js";
import cities from "cities.json";

const Results = (props) => {
  const getResultsList = () => {
    const reg = new RegExp("^" + props.input, "gi");
    let list = cities.filter((city) => city.name.match(reg));
    return list.slice(0, 5);
  };

  const findCountry = (code) => {
    const c = countries.find((c) => c.country_code === code);
    return c.country_name;
  };

  const handleClick = (e) => {
    props.func(e.target.textContent);
  };

  const resultList = getResultsList();

  return (
    <div id="results">
      <ol>
        {resultList.map((result, i) => (
          <li key={i} className="result" onClick={handleClick}>
            {result.name + ", " + findCountry(result.country)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
