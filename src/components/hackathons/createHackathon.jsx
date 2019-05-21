import React, { Component } from "react";
import "../../css/createHackathon.css";
import Navbar from "../common/navbar";
import Form from "../common/form";
import { Redirect } from "react-router";
import axios from "axios";
import Joi from "joi-browser";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import { rootUrl } from "../common/constant";
var moment = require("moment");

class CreateHackathon extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      currentDate: "",
      localStartDate: "",
      localEndDate: "",
      dataSend: "",
      errors: {},
      dbErrors: ""
    };
  }

  schema = {
    name: Joi.string()
      .required()
      .max(50)
      .label("Name"),
    description: Joi.string()
      .max(300)
      .required()
      .min(10)
      .label("Description"),
    start_date: Joi.string()
      .required()
      .label("Start Date"),
    end_date: Joi.string()
      .label("End Date")
      .required(),
    fee: Joi.string()
      .label("Fee")
      .regex(/^[0-9.]*$/)
      .required(),
    min_size: Joi.string()
      .label("Minimum Team Size")
      .required()
      .regex(/^[0-9]*$/),
    max_size: Joi.string()
      .label("Maximum Team Size")
      .required()
      .regex(/^[0-9]*$/),
    judges: Joi.string()
      .label("Judges")
      .required(),
    sponsors: Joi.string().label("Sponsors"),
    discount: Joi.string()
      .label("Discount")
      .regex(/^[0-9]*$/)
  };

  doSubmit = async e => {
    var today = new Date();
    var start_date = new Date(this.state.data.start_date);
    var end_date = new Date(this.state.data.end_date);
    if (start_date < today)
      window.alert("Start Date cannot be less than today");
    else if (end_date < today)
      window.alert("End Date cannot be less than today");
    else if (end_date < start_date)
      window.alert("End Date cannot be less than start date");
    else if (this.state.data.max_size <= 0)
      window.alert("Maximum team size cannot be less 1");
    else if (this.state.data.min_size <= 0)
      window.alert("Minimum team size cannot be less than 1");
    else if (this.state.data.max_size < this.state.data.min_size)
      window.alert("Maximum team size cannot be less than minimum team size");
    else {
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
          setHeader();
          var res = await axios.get(rootUrl + "/users?name=" + name);
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
          setHeader();
          var res = await axios.get(rootUrl + "/organizations?name=" + name);
          var sid = Number.parseInt(res.data[0].id, 10) - 1;
          data["sponsors"][i] = sid + 1;
        }
      });

      this.setState(
        {
          dataSend: data
        },
        function() {
          console.log(this.state.dataSend);
        }
      );
    }
  };

  async submit(e) {
    e.preventDefault();
    var id = getJWTID();
    setHeader();
    await axios
      .post(rootUrl + "/hackathons?ownerId=" + id, this.state.dataSend)
      .then(response => {
        window.alert("Hackathon created successfully.");
        this.props.history.push("/hackathons");
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
              <label>Name </label>
              <input
                type="text"
                name="name"
                required
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
                error={this.state.errors.name}
              />
              {this.state.errors.name && (
                <div className="red">{this.state.errors.name} </div>
              )}
              <label>Description</label>
              <textarea
                required
                name="description"
                placeholder="Description"
                className="form-control"
                onChange={this.handleChange}
                error={this.state.errors.description}
              />
              {this.state.errors.description && (
                <div className="red">{this.state.errors.description} </div>
              )}
              <label>Start Date</label>
              <input
                type="date"
                required
                name="start_date"
                className="form-control"
                onChange={this.handleChange}
                error={this.state.errors.start_date}
              />
              {this.state.errors.start_date && (
                <div className="red">{this.state.errors.start_date} </div>
              )}
              <label>End Date</label>
              <input
                required
                type="date"
                name="end_date"
                className="form-control"
                onChange={this.handleChange}
                error={this.state.errors.end_date}
              />
              {this.state.errors.end_date && (
                <div className="red">{this.state.errors.end_date} </div>
              )}
              <label>Entry Fee</label>
              <input
                type="number"
                name="fee"
                required
                className="form-control"
                placeholder="Fee in USD"
                onChange={this.handleChange}
                error={this.state.errors.fee}
              />
              {this.state.errors.fee && (
                <div className="red">{this.state.errors.fee} </div>
              )}
              <label>Minimum Team Size</label>
              <input
                type="text"
                name="min_size"
                required
                className="form-control"
                placeholder="Minimum Team Size (inclusive)"
                onChange={this.handleChange}
                error={this.state.errors.min_size}
              />
              {this.state.errors.min_size && (
                <div className="red">{this.state.errors.min_size} </div>
              )}
              <label>Maximum Team Size</label>
              <input
                type="text"
                name="max_size"
                required
                className="form-control"
                placeholder="Maximum Team Size (inclusive)"
                onChange={this.handleChange}
                error={this.state.errors.max_size}
              />
              {this.state.errors.max_size && (
                <div className="red">{this.state.errors.max_size} </div>
              )}
              <label>Judges</label>
              <input
                type="text"
                name="judges"
                required
                className="form-control"
                placeholder=" Atleast 1 with Semi-colon(;) separated"
                onChange={this.handleChange}
                error={this.state.errors.judges}
              />
              {this.state.errors.judges && (
                <div className="red">{this.state.errors.judges} </div>
              )}
              <label>Sponsors (Optional)</label>
              <input
                type="text"
                name="sponsors"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
                error={this.state.errors.sponsors}
              />
              {this.state.errors.sponsors && (
                <div className="red">{this.state.errors.sponsors} </div>
              )}
              <label>Discount in % </label>
              <input
                type="text"
                name="discount"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
                error={this.state.errors.discount}
              />
              {this.state.errors.discount && (
                <div className="red">{this.state.errors.discount} </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Finalize Hackathon
              </button>{" "}
              <br />
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.submit.bind(this)}
              >
                Ready ? Create
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateHackathon;
