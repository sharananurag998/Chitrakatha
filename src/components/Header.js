import React from "react";
import "./Header.css";
import Logo from "../logo.png";

function Header() {
  return (
    <div className="app__header">
      <img className="app__headerImage" src={Logo} />
    </div>
  );
}

export default Header;
