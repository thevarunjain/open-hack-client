import React, { Component } from "react";
import "../css/home.css";
import { Redirect } from "react-router";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "./common/auth";

class HomeBody extends Component {
  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (id) {
      redirectVar = <Redirect to="/hackathons" />;
    }
    return (
      <div className="home-body">
        {redirectVar}
        <div className="header-content">
          Allow students to innovate and collaborate <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; through
          hackathons
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="footer-content">
          Manage your university's next hackathon seamlessly with our
          best-in-class hackathon platform
        </div>
      </div>
    );
  }
}

export default HomeBody;
