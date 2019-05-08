import React, { Component } from "react";
import "../../css/notFound.css";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";

class SignupConfirmation extends Component {
  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (id) {
      redirectVar = <Redirect to="/hackathons" />;
    }
    return (
      <div className="home">
        {redirectVar}
        <Navbar />
        <p className="notfound">
          An email has been sent to you to confirm your e-mail ID.
        </p>
      </div>
    );
  }
}

export default SignupConfirmation;
