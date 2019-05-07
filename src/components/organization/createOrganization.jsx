import React, { Component } from "react";
import "../../css/createOrganization.css";
import Navbar from "../common/navbar";
import Form from "../common/form";
import { Redirect } from "react-router";
import axios from "axios";

class CreateOrganization extends Form {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  doSubmit = e => {
    var ownerId = localStorage.getItem("id");
    axios
      .post("http://localhost:8080/organizations/" + ownerId, this.state.data)
      .then(response => {
        window.alert("Organization created successfully.");
      });
  };

  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
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
