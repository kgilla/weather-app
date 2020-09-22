import React, { useState } from "react";
import Results from "./results";
import PartialResults from "./partialResults";
import { Cross } from "@styled-icons/entypo";

const SearchBar = (props) => {
  let [input, setInput] = useState("");
  let [showResults, setShowResults] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
    props.sendInput(e.target.value);
    input.length > 0 ? setShowResults(true) : setShowResults(false);
  };

  const handleSubmit = () => {
    props.submit();
  };

  const handleClick = () => {
    setInput("");
    props.setSelected("");
    setShowResults(false);
    props.setShowPartial(false);
  };

  const handleInputChange = (input) => {
    props.sendInput(input);
    setInput(input);
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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setShowResults(false);
      props.submit();
    } else if (e.keyCode === 38) {
      e.preventDefault();
      props.getSelection("down");
    } else if (e.keyCode === 40) {
      e.preventDefault();
      props.getSelection("up");
    }
  };

  const handleHideSearch = () => {
    props.hideSearch();
  };

  return (
    <form id="search-form" autoComplete="off">
      {props.weather !== "" ? (
        <button id="hide-search" onClick={handleHideSearch}>
          <Cross id="hide-search-icon" />
        </button>
      ) : null}
      <h2 id="search-heading">4-Cast</h2>
      <div id="search-bar">
        <div id="search-results">
          <div
            id="input-container"
            className={showResults || props.showPartial ? "open" : "closed"}
          >
            <input
              type="text"
              id="search-input"
              placeholder="Enter a city"
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={props.inputValue ? props.inputValue : input}
              onKeyDown={handleKeyDown}
            ></input>
            {input.length > 0 ? (
              <button id="cancel-button" onClick={handleClick}>
                <Cross id="cancel-icon" />
              </button>
            ) : null}
          </div>

          {showResults && props.results.length > 0 ? (
            <Results
              results={props.results}
              getInput={handleInputChange}
              sendIndex={props.sendIndex}
              selected={props.selected}
            />
          ) : null}
          {props.showPartial ? (
            <PartialResults
              results={props.results}
              input={input}
              sendIndex={props.sendIndex}
            />
          ) : null}
        </div>
        <button type="button" onClick={handleSubmit} className="search-button">
          Search{" "}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
