import React, { Component } from "react";
import "../../css/navbar.css";
import { Redirect } from "react-router";
import { If } from "react-if";

class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    console.log("Logged out successfully.");
    return <Redirect to="/home" />;
  };
  render() {
    localStorage.setItem("username", "shishir.kulkarni@sjsu.edu");
    localStorage.setItem("id", "1");
    var id = localStorage.getItem("id");
    var username = localStorage.getItem("username");

    return (
      <div>
        <If condition={!id}>
          <nav className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-home" href="/home">
              OpenHack
            </a>

            <a href="/login" className="login">
              Login
            </a>
          </nav>
        </If>
        <If condition={id}>
          <nav className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-home" href="/home">
              OpenHack
            </a>
            <div className="nav-item dropdown dropdown-navbar">
              <a
                class="nav-link dropdown-toggle drop-user"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}
              </a>
              <div class="dropdown-menu item" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <a className="dropdown-item" href="/organizations">
                  My Organizations
                </a>
                <a className="dropdown-item" onClick={this.handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </If>
      </div>
    );
  }
}

export default Navbar;
