import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/signup.css";

class Signup extends Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <div className="login-one">Sign up for OpenHack</div>
        <br />
        <div className="login-two">
          Already have an account? <a href="/login">Login</a>
        </div>
        <div className="login-container">
          <div className="container">
            <div className="form-header">Account Sign up</div>
            <hr />
            <form>
              <input
                type="text"
                name="screenname"
                autoFocus
                className="form-control"
                placeholder="First and Last Name"
              />

              <br />
              <input
                type="text"
                name="username"
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
                Sign up
              </button>
            </form>

            <a className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook" />
              <span className="facebook">Log in with Facebook</span>
            </a>

            <a className="btn btn-block btn-social btn-google">
              <span className="fa fa-google" />
              <span className="google_text">Log in with Google</span>
            </a>
          </div>
        </div>
        <div className="footer-1">
          Use of this Web site constitutes acceptance of the OpenHack.com{" "}
          <a href="/login">Terms and Conditions </a>
          and <a href="/login">Privacy Policy</a>. <br />
          <div className="footer-2">©2019 OpenHack. All rights reserved.</div>
        </div>
      </div>
    );
  }
}

export default Signup;
