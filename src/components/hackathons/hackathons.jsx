import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";

class Hackathons extends Component {
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
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
        <div className="hackathons-list">
          <div className="hackathon">
            <img src={require("../../images/1.jpg")} width="250" height="250" />
            <div className="hackathon-info">
              <h3>
                <Link to="" className="link">
                  Hackathon Name
                </Link>
              </h3>
              from - to
              <br />
              Location
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Hackathons;
