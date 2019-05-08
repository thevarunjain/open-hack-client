import React, { Component } from "react";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import Navbar from "../common/navbar";
import Form from "../common/form";
import axios from "axios";
import { Redirect } from "react-router";

class CreateTeam extends Form {
  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-body">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <form>
            <div className="org-information">
              <h3>Team Information</h3>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="members"
                className="form-control"
                placeholder="Members semi-colon separated"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="roles"
                className="form-control"
                placeholder="Roles semi-colon separated"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Update
            </button>{" "}
            <button
              type="submit"
              className="btn btn-primary"
              //   onClick={this.submit.bind(this)}
            >
              Send
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
