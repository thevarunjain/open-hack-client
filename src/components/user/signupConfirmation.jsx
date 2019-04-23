import React, { Component } from "react";
import "../../css/notFound.css";
import Navbar from "../common/navbar";

class SignupConfirmation extends Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <p className="notfound">
          An email has been sent to you to confirm your e-mail ID.
        </p>
      </div>
    );
  }
}

export default SignupConfirmation;
