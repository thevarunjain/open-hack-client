import React, { Component } from "react";
import "../../css/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-home" href="/home">
          OpenHack
        </a>

        <a href="/login" className="login">
          Login
        </a>
      </nav>
    );
  }
}

export default Navbar;
