import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";

class Hackathon extends Component {
  render() {
    return (
      <div className="hackathon-home">
        <Navbar />
        <div className="hackathon-details">
          <h2>Hackathon Name</h2>
          <br />
          Description
          <br />
          <br />
          Start Date: date
          <br />
          End Date: date
          <br />
          Fee: $00
          <br />
          Team size: 1 - 10
          <br />
          Status: In progress
        </div>
        <div className="hackathon-team">
          <h3>Teams</h3>
          <Link to="/hackathon">Team 1</Link>
          <br />
          <Link to="/hackathon">Team 2</Link>
          <br />
          <Link to="/hackathon">Team 3</Link>
          <br />
          <Link to="/hackathon">Team 4</Link>
        </div>
        <div className="hackathon-judge">
          <h3>Judges</h3>
          <Link to="/profile">Judge 1</Link>
          <br />
          <Link to="/profile">Judge 2</Link>
        </div>
        <div className="hackathon-sponsor">
          <h3>Sponsors</h3>
          Sponsor 1
          <br />
          Sponsor 2
        </div>
      </div>
    );
  }
}

export default Hackathon;
