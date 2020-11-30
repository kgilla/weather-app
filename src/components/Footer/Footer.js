import React from "react";
import "./Footer.css";
import { Github } from "@styled-icons/evaicons-solid";

const Footer = () => {
  return (
    <footer id="main-footer">
      <a className="icon-link" href="https://github.com/kgilla">
        <Github id="github-icon" />
      </a>
    </footer>
  );
};

export default Footer;
