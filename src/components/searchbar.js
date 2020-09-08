import React, { useState } from "react";
import Results from "./results";

const SearchBar = (props) => {
  let [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input !== "") {
      props.sendInput(input);
      setInput("");
    }
  };

  const handleInputChange = (input) => {
    setInput(input);
  };

  return (
    <form id="search-bar" autoComplete="off">
      <label htmlFor="searchInput">Whats The Weather Like In...</label>
      <input
        type="text"
        id="searchInput"
        placeholder="Enter a city"
        onChange={handleInput}
        value={input}
      ></input>
      <button onClick={handleClick}>Search</button>
      {input.length >= 1 ? (
        <Results input={input} func={handleInputChange} />
      ) : null}
    </form>
  );
};

export default SearchBar;
