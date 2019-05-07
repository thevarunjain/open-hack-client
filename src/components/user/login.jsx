import React from "react";
import Navbar from "../common/navbar";
import "../../css/login.css";
import Form from "../common/form";
import axios from "axios";
import { signUpWithFacebook } from "../Firebase";
import { signUpWithGoogle } from "../Firebase";
import { loginWithCredentials } from "../Firebase";
import { isUserVerified } from "../Firebase";
import { getFirebaseUser } from "../Firebase";
import { Redirect } from "react-router";
var firebase = require("firebase/app");
require("firebase/auth");

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    user: ""
  };

  doSubmit = () => {
    if (isUserVerified()) {
      var loggedInUser = loginWithCredentials(
        this.state.data.username,
        this.state.data.password
      );
    }
    axios
      .post("http://localhost:3001/login", this.state.data)
      .then(response => {
        console.log("Status Code : ", response.data);
        if (response.status === 200) {
          console.log("Login successful.");
          localStorage.setItem("username", this.state.data.username);
          localStorage.setItem("id", this.state.data.id);
        }
      });
  };

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
        <div className="login-one">Log in to OpenHack</div>
        <br />
        <div className="login-two">
          Need an account? <a href="/signup">Sign Up</a>
        </div>
        <div className="login-container">
          <div className="container">
            <div className="form-header">Account Login</div>
            <hr />

            <input
              type="email"
              name="username"
              autoFocus
              className="form-control"
              placeholder="Email address"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <br />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="login-btn">
                Login
              </button>
              <input type="checkbox" />
              <label> &nbsp; Keep me signed in</label>
            </form>

            <button
              type="submit"
              className="btn btn-block btn-social btn-facebook"
              onClick={signUpWithFacebook}
            >
              <span className="fa fa-facebook" />
              <span className="facebook">Log in with Facebook</span>
            </button>

            <button
              type="submit"
              className="btn btn-block btn-social btn-google"
              onClick={signUpWithGoogle}
            >
              <span className="fa fa-google" />
              <span className="google_text">Log in with Google</span>
            </button>
          </div>
        </div>
        <div className="login-footer-1">
          Use of this Web site constitutes acceptance of the OpenHack.com{" "}
          <a href="/login">Terms and Conditions </a>
          and <a href="/login">Privacy Policy</a>. <br />
          <div className="login-footer-2">
            ©2019 OpenHack. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
