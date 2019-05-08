import React, { Component } from "react";
import "../../css/createOrganization.css";
import Navbar from "../common/navbar";
import Form from "../common/form";
import { Redirect } from "react-router";
import axios from "axios";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";

class CreateOrganization extends Form {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  doSubmit = e => {
    var ownerId = getJWTID();
    console.log("data=", this.state.data);

    var address = {
      street: this.state.data.street,
      city: this.state.data.city,
      state: this.state.data.state,
      zip: this.state.data.zipcode
    };

    var org = {
      name: this.state.data.name,
      description: this.state.data.description,
      address: address
    };

    console.log(org);
    setHeader();
    axios
      .post("http://localhost:8080/organizations?ownerId=" + ownerId, org)
      .then(response => {
        window.alert("Organization created successfully.");
      });
  };

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="profile-home orgs">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <a className="btn btn-primary create-org" href="/organizations">
            My Organizations
          </a>
          <br />
          <br />
          <br />
          <form>
            <div className="org-information">
              <h3>Organization Information</h3>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                className="form-control"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Zipcode"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Save
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOrganization;
