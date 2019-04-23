import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/login.css";

class Login extends Component {
  render() {
    return (
      <div className="home">
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
            <form>
              <input
                type="text"
                name="username"
                autoFocus
                className="form-control"
                placeholder="Email address"
              />
              <br />
              <input
                type="text"
                name="password"
                className="form-control"
                placeholder="Password"
              />

              <button type="submit" className="login-btn">
                Login
              </button>
              <input type="checkbox" />
              <label> &nbsp; Keep me signed in</label>
            </form>

            <button
              type="submit"
              className="btn btn-block btn-social btn-facebook"
            >
              <span className="fa fa-facebook" />
              <span className="facebook">Log in with Facebook</span>
            </button>

            <button
              type="submit"
              className="btn btn-block btn-social btn-google"
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
