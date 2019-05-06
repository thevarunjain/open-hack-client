import React, { Component } from "react";
import "../../css/notFound.css";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";

class SignupConfirmation extends Component {
  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
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
