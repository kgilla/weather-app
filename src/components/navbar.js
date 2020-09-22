import React from "react";
import { Search } from "@styled-icons/bootstrap";

const Navbar = (props) => {
  const handleClick = () => {
    props.showSearch();
  };
  return (
    <nav id="search-nav">
      <h1 id="nav-heading">4-Cast</h1>
      <button id="nav-button" onClick={handleClick}>
        <Search id="search-icon" />
      </button>
    </nav>
  );
};

export default Navbar;
