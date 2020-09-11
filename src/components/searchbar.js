import React, { useState } from "react";
import Results from "./results";
import { Cross } from "@styled-icons/entypo";

const SearchBar = (props) => {
  let [input, setInput] = useState("");
  let [showResults, setShowResults] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
    input.length > 0 ? setShowResults(true) : setShowResults(false);
  };

  const handleSubmit = () => {
    if (input !== "") {
      props.sendInput(input);
      setInput("");
      setShowResults(false);
    }
  };

  const handleClick = () => {
    setInput("");
    setShowResults(false);
  };

  const handleInputChange = (input) => {
    setShowResults(false);
    setInput("");
    props.sendInput(input);
  };

  const handleFocus = () => {
    if (input.length > 1 && showResults === false) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    if (showResults === true) {
      setShowResults(false);
    }
  };

  const handleData = (data) => {
    props.getData(data);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form id="search-form" autoComplete="off">
      <h2 id="search-heading">4-Cast</h2>
      <div id="search-bar">
        <div id="search-results">
          <div id="input-container">
            <input
              type="text"
              id="search-input"
              placeholder="Enter a city"
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={input}
              onKeyDown={handleKeyDown}
              className={showResults === true ? "open" : "closed"}
            ></input>
            {input.length > 0 ? (
              <button id="cancel-button" onClick={handleClick}>
                <Cross id="cancel-icon" />
              </button>
            ) : null}
          </div>

          {showResults ? (
            <Results
              input={input}
              getData={handleData}
              getInput={handleInputChange}
            />
          ) : null}
        </div>
        <button type="button" onClick={handleSubmit} id="search-button">
          Search{" "}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
