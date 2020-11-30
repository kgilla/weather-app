import React, { useState, useEffect } from "react";
import { Search } from "@styled-icons/bootstrap";
import "./Navbar.css";

const Navbar = (props) => {
  let [scrollPosition, setScrollPosition] = useState(0);
  let [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      scrollPosition > currentScrollPos
        ? setIsVisible(true)
        : setIsVisible(false);
      console.log(scrollPosition);
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleClick = () => {
    props.showSearch();
    window.scrollTo(0, 0);
  };
  return (
    <nav id="search-nav" className={isVisible ? "not-offset" : "offset"}>
      <div id="nav-items">
        <h1 id="nav-heading">4-Cast</h1>
        <button id="nav-button" onClick={handleClick}>
          <Search id="search-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
