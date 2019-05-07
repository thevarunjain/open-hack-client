import React, { Component } from "react";
import "../../css/createHackathon.css";
import Navbar from "../common/navbar";
import Form from "../common/form";
import { Redirect } from "react-router";
import axios from "axios";

class CreateHackathon extends Form {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  doSubmit = e => {
    var id = localStorage.getItem("id");
    console.log(this.state.data);
    axios
      .post("http://localhost:8080/hackathons", this.state.data + id)
      .then(response => {
        window.alert("Hackathon created successfully.");
      });
  };

  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="home">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <form>
            <div className="org-information">
              <h3>Hackathon Information</h3>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />
              <label>Start Date:</label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                onChange={this.handleChange}
              />

              <label>End Date:</label>
              <input
                type="date"
                name="end_date"
                className="form-control"
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
                name="fee"
                className="form-control"
                placeholder="Fee"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="min_size"
                className="form-control"
                placeholder="Minimum Number of People"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="max_size"
                className="form-control"
                placeholder="Maximum Number of People"
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

export default CreateHackathon;
