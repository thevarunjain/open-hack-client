import React, { Component } from "react";
import "../../css/navbar.css";
import { Redirect } from "react-router";

import { If, Then, Else } from "react-if";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus
} from "../common/auth";
import {signoutFirebase} from "../Firebase";

class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully.");
    window.location.reload();
    signoutFirebase();
  };
  render() {
    var id = getJWTID();
    var screenName = getJWTScreenName();

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
                {screenName}
              </a>
              <div class="dropdown-menu item" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <a className="dropdown-item" href="/organizations">
                  My Organizations
                </a>

                <If condition={getJWTAdminStatus()}>
                  <Then>
                    <a
                      className="dropdown-item"
                      href="/hackathons/adminHackathons"
                    >
                      My Hackathons
                    </a>
                  </Then>
                  <Else>
                    <a
                      className="dropdown-item"
                      href="/hackathons/hackerHackathons"
                    >
                      My Hackathons
                    </a>
                  </Else>
                </If>
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
