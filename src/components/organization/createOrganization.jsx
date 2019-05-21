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
import { rootUrl } from "../common/constant";
import Joi from "joi-browser";

class CreateOrganization extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {},
      dbErrors: ""
    };
  }

  schema = {
    name: Joi.string()
      .required()
      .max(25)
      .label("Name"),
    description: Joi.string()
      .max(200)
      .min(0)
      .label("Description"),
    street: Joi.string()
      .max(20)
      .min(0)
      .label("Street"),
    city: Joi.string()
      .label("City")
      .min(0)
      .max(20),
    state: Joi.string()
      .label("State")
      .min(0)
      .max(10),
    zipcode: Joi.string()
      .label("Zipcode")
      .max(6)
      .min(5)
      .regex(/^[0-9]*$/)
  };

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
      .post(rootUrl + "/organizations?ownerId=" + ownerId, org)
      .then(response => {
        window.alert("Organization created successfully.");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          dbErrors: error.response.data.code
        });
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
                error={this.state.errors.name}
              />
              {this.state.errors.name && (
                <div className="red">{this.state.errors.name} </div>
              )}

              <textarea
                name="description"
                placeholder="Description"
                className="form-control"
                onChange={this.handleChange}
                error={this.state.errors.description}
              />
              {this.state.errors.description && (
                <div className="red">{this.state.errors.description} </div>
              )}
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street"
                onChange={this.handleChange}
                error={this.state.errors.street}
              />
              {this.state.errors.street && (
                <div className="red">{this.state.errors.street} </div>
              )}
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                onChange={this.handleChange}
                error={this.state.errors.city}
              />
              {this.state.errors.city && (
                <div className="red">{this.state.errors.city} </div>
              )}
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                onChange={this.handleChange}
                error={this.state.errors.state}
              />
              {this.state.errors.state && (
                <div className="red">{this.state.errors.state} </div>
              )}
              <input
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Zipcode"
                onChange={this.handleChange}
                error={this.state.errors.zipcode}
              />
              {this.state.errors.zipcode && (
                <div className="red">{this.state.errors.zipcode} </div>
              )}
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
