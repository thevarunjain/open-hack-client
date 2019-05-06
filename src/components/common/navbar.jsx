import React, { Component } from "react";
import "../../css/navbar.css";
import { Redirect } from "react-router";

class Navbar extends Component {
  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-home" href="/home">
            OpenHack
          </a>

          <a href="/login" className="login">
            Login
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
