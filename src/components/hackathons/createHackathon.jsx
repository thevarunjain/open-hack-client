import React, { Component } from "react";
import "../../css/createHackathon.css";
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
var moment = require("moment");

class CreateHackathon extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      currentDate: "",
      localStartDate: "",
      localEndDate: "",
      dataSend: ""
    };
  }

  doSubmit = async e => {
    var startDateLocale = this.state.data.start_date;
    var startDate = moment(startDateLocale, "YYYY-MM-DD").toDate();

    var endDateLocale = this.state.data.end_date;
    var endDate = moment(endDateLocale, "YYYY-MM-DD").toDate();

    var data = {
      name: this.state.data.name,
      description: this.state.data.description,
      startDate: startDate,
      endDate: endDate,
      fee: this.state.data.fee,
      minSize: this.state.data.min_size,
      maxSize: this.state.data.max_size,
      judges: [],
      sponsors: [],
      discount: []
    };

    var judgesName = this.state.data.judges
                          ? this.state.data.judges.split(";").map(e => e.trim())
                          : [];

    judgesName.map(async (name, i) => {
      if (name.replace(/\s/gi, "").length != 0) {
        // console.log(name);
        setHeader();
        var res = await axios.get("http://localhost:8080/users?name=" + name);
        var jid = Number.parseInt(res.data[0].id, 10) - 1;
        data["judges"].push(jid + 1);
      }
    });

    var discountsArray = this.state.data.discount
                              ? this.state.data.discount.split(";")
                              : [];

    data["discount"] = discountsArray.map(e => Number.parseInt(e.trim(), 10));

    var sponsorsName = this.state.data.sponsors
      ? this.state.data.sponsors.split(";").map(e => e.trim())
      : [];

    sponsorsName.map(async (name, i) => {
      if (name.replace(/\s/gi, "").length != 0) {
        // console.log(name);
        setHeader();
        var res = await axios.get(
          "http://localhost:8080/organizations?name=" + name
        );
        console.log(res.data);
        var sid = Number.parseInt(res.data[0].id, 10) - 1;
        data["sponsors"][i] = sid + 1;
      }
    });

    console.log(data);

    this.setState(
      {
        dataSend: data
      },
      function() {
        console.log(this.state.dataSend);
        this.submit();
      }
    );
  };

  async submit(e) {
    var id = getJWTID();
    setHeader();
    await axios
      .post(
        "http://localhost:8080/hackathons?ownerId=" + id,
        this.state.dataSend
      )
      .then(response => {
        // console.log(response.data);
        window.alert("Hackathon created successfully.");
      });
  }

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-container">
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
              <input
                type="text"
                name="judges"
                className="form-control"
                placeholder="Judges semi-colon separated"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="sponsors"
                className="form-control"
                placeholder="Sponsors semi-colon separated"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="discount"
                className="form-control"
                placeholder="Discount semi-colon separated"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Create
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateHackathon;
