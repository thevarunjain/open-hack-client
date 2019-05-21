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
import Joi from "joi-browser";
import { rootUrl } from "../common/constant";
var firebase = require("firebase/app");
require("firebase/auth");

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    user: "",
    errors: {},
    dbErrors: ""
  };

  doSubmit = async () => {

    var email = this.state.data.username;
    var password = this.state.data.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
            if (data.user.emailVerified) {
              var data = {
                email,
                password
              };
                    axios.post(rootUrl + "/auth/signin", data)
                        .then(response => {
                        console.log("Status Code : ", response.status);
                        if (response.status === 200) {
                          console.log("Login successful.");
                          localStorage.setItem("token", response.data.accessToken);
                          this.props.history.push("/hackathons");
                        } else if (response.status === 400) {
                          window.alert("Username and/or password is incorrect");
                        }
                      })
                      .catch(error => {
                        this.setState({
                          dbErrors: error.response.data.code
                        });
                      });
          } else {
            window.alert("Email is not verified. Check your mail");
            console.log("Email not verified");
            // window.location.reload();
          }
          })
      .catch(function(error) {
      console.log(error);
      window.alert(error.message);
    });
  };

  schema = {
    username: Joi.string()
      .required()
      .max(30)
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .label("Email address"),
    password: Joi.string()
      .required()
      .label("Password")
      .max(30)
      .min(6)
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
              error={this.state.errors.username}
            />
            {this.state.errors.username && (
              <div className="red">{this.state.errors.username} </div>
            )}
            <br />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              error={this.state.errors.password}
            />
            {this.state.errors.password && (
              <div className="red">{this.state.errors.password} </div>
            )}
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="login-btn">
                Login
              </button>
              {/* <input type="checkbox" />
              <label> &nbsp; Keep me signed in</label> */}
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
