import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../common/form";
import { Redirect } from "react-router";
import { If } from "react-if";

class Hackathons extends Form {
  constructor() {
    super();
    this.state = {
      hackathons: [],
      data: {},
      isAdmin: false
    };
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username.includes("@sjsu.edu")) this.setState({ isAdmin: true });

    axios.get("http://localhost:8080/hackathons").then(response => {
      this.setState({
        hackathons: response.data
      });
    });
  }

  doSubmit = e => {
    axios
      .get(
        "http://localhost:8080/hackathons/name/" +
          this.state.data.hackathon_name
      )
      .then(response => {
        this.setState({ hackathons: response.data });
      });
  };

  render() {
    console.log(this.state.hackathons);
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="hack-home">
        {redirectVar}
        <Navbar />
        <h1>Upcoming Hackathons</h1>
        <div className="heading">
          Find, compete, and earn points for your school at the largest, most
          diverse
          <br /> <span>student hackathons in the world.</span>
        </div>
        <If condition={this.state.isAdmin}>
          <a className="btn btn-primary create-hack" href="/hackathon/create">
            Create Hackathon
          </a>
        </If>
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
                  <Link
                    className="link"
                    to={{
                      pathname: "/hackathon",
                      state: { id: hackathon.id }
                    }}
                  >
                    {hackathon.name}
                  </Link>
                </h3>
                {hackathon.startDate} - {hackathon.endDate}
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
