import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Hackathon from "./hackathon";
import Form from "../common/form";

class Hackathons extends Form {
  constructor() {
    super();
    this.state = {
      hackathons: {},
      data: {}
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/hackathons").then(response => {
      this.setState({
        hackathons: response.data
      });
    });
  }

  doSubmit = e => {
    axios
      .get("http://localhost:3001/hackathons/" + this.state.data.hackathon_name)
      .then(response => {
        this.setState({ hackathons: response.data });
      });
  };

  render() {
    return (
      <div className="home">
        <Navbar />
        <h1>Upcoming Hackathons</h1>
        <div className="heading">
          Find, compete, and earn points for your school at the largest, most
          diverse
          <br /> <span>student hackathons in the world.</span>
        </div>
        <div className="search">
          <input
            type="text"
            name="hackathon_name"
            className="form-control"
            placeholder="Hackathon name"
            onChange={this.handleChange}
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </div>
        {this.state.hackathons.map(hackathon => (
          <div className="hackathons-list">
            <div className="hackathon">
              <img
                src={require("../../images/1.jpg")}
                width="250"
                height="250"
              />
              <div className="hackathon-info">
                <h3>
                  <Link to="/hackathon" className="link">
                    {hackathon.name}
                  </Link>
                </h3>
                {hackathon.start_date} - {hackathon.end_date}
                <br />
                {hackathon.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Hackathons;
