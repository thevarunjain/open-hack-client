import React from "react";
import Navbar from "../common/navbar";
import "../../css/signup.css";
import Form from "../common/form";
import axios from "axios";
import { Redirect } from "react-router";
import { signUpWithFacebook } from "../Firebase";
import { signUpWithGoogle } from "../Firebase";
import { signUpWithCredentials } from "../Firebase";
import Joi from "joi-browser";
import { rootUrl } from "../common/constant";

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
      },
      errors: {},
      dbErrors: ""
    };
  }

  doSubmit = () => {
    var signedUpUser = signUpWithCredentials(
      this.state.data.username,
      this.state.data.password
    );

    var name = {
      first: this.state.data.firstname,
      last: this.state.data.lastname
    };

    var data = {
      name: name,
      email: this.state.data.username,
      screenName: this.state.data.screenname,
      password: this.state.data.password
    };

    console.log("from signup page ", signedUpUser);
    axios
      .get(rootUrl + "/users/checkScreenName?screenName=" + data.screenName)
      .then(response => {
        axios
          .post(rootUrl + "/users", data)
          .then(response => {
            console.log("res=" + response);
            if (response.status === 201) {
              window.alert("Sign up successful.");
              this.props.history.push("/confirm");
            } else {
              console.log("Error in sign up.");
            }
          })
          .catch(error => {
            this.setState({
              dbErrors: error.response.data.code
            });
          });
      })
      .catch(error => {
        window.alert("Screen name is already used by another user.");
      });
  };

  schema = {
    firstname: Joi.string()
      .required()
      .max(15)
      .regex(/^[a-zA-Z]*$/)
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .max(15)
      .regex(/^[a-zA-Z]*$/)
      .label("Last Name"),
    username: Joi.string()
      .required()
      .max(30)
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .label("Email address"),
    password: Joi.string()
      .required()
      .label("Password")
      .max(20)
      .min(6),
    screenname: Joi.string()
      .required()
      .label("Screen Name")
      .max(20)
      .min(3)
      .regex(/^[a-zA-Z0-9]*$/)
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
              error={this.state.errors.firstname}
            />
            {this.state.errors.firstname && (
              <div className="red">{this.state.errors.firstname} </div>
            )}
            <br />
            <input
              type="input"
              name="lastname"
              className="form-control"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.lastname}
              error={this.state.errors.lastname}
            />
            {this.state.errors.lastname && (
              <div className="red">{this.state.errors.lastname} </div>
            )}
            <br />
            <input
              type="input"
              name="screenname"
              className="form-control"
              placeholder="Screen Name"
              onChange={this.handleChange}
              value={this.state.screenname}
              error={this.state.errors.screenname}
            />
            {this.state.errors.screenname && (
              <div className="red">{this.state.errors.screenname} </div>
            )}
            <br />
            <input
              type="email"
              name="username"
              className="form-control"
              placeholder="Email Address"
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
                Sign up
              </button>
            </form>

            <button
              type="submit"
              className="btn btn-block btn-social btn-facebook"
              onClick={signUpWithFacebook}
            >
              <span className="fa fa-facebook" />
              <span className="facebook">Sign up with Facebook</span>
            </button>

            <button
              type="submit"
              className="btn btn-block btn-social btn-google"
              onClick={signUpWithGoogle}
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
