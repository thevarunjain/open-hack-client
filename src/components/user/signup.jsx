import React from "react";
import Navbar from "../common/navbar";
import "../../css/signup.css";
import Form from "../common/form";
import axios from "axios";
import { Redirect } from "react-router";

class Signup extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        lastname: "",
        screenname: "",
        username: "",
        password: ""
      }
    };
  }

  doSubmit = () => {
    axios
      .post("http://localhost:3001/users", this.state.data)
      .then(response => {
        if (response.status === 200) {
          window.alert("Sign up successful.");
          this.props.history.push("/confirm");
        } else {
          console.log("Error in sign up.");
        }
      });
  };

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

            <input
              type="input"
              name="firstname"
              autoFocus
              className="form-control"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.firstname}
            />
            <br />
            <input
              type="input"
              name="lastname"
              className="form-control"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <br />
            <input
              type="input"
              name="screenname"
              className="form-control"
              placeholder="Screen Name"
              onChange={this.handleChange}
              value={this.state.screenname}
            />
            <br />
            <input
              type="email"
              name="username"
              className="form-control"
              placeholder="Email Address"
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
                Sign up
              </button>
            </form>

            <button
              type="submit"
              className="btn btn-block btn-social btn-facebook"
            >
              <span className="fa fa-facebook" />
              <span className="facebook">Sign up with Facebook</span>
            </button>

            <button
              type="submit"
              className="btn btn-block btn-social btn-google"
            >
              <span className="fa fa-google" />
              <span className="google_text">Sign up with Google</span>
            </button>
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
