import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

class MyAdminHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      teams: []
    };
    this.handleOpenStatus = this.handleOpenStatus.bind(this);
    this.handleClosedStatus = this.handleClosedStatus.bind(this);
    this.handleFinalizedStatus = this.handleFinalizedStatus.bind(this);
  }

  componentDidMount() {
    const ID = this.props.location.state.id;
    console.log("id=", ID);
    axios.get("http://localhost:8080/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
    });

    axios
      .get("http://localhost:8080/hackathons/" + ID + "/teams")
      .then(response => {
        this.setState({
          teams: response.data
        });
      });
  }

  handleOpenStatus = e =>{
    e.preventDefault();
    const ID = this.props.location.state.id;
    var data = {
      toState : "Open"
    };
    axios.patch("http://localhost:8080/hackathons/" + ID, data).then(response => {
      window.alert("Hackathon Status updated successfully.");
    });
  }

  handleClosedStatus = e =>{
    e.preventDefault();
    const ID = this.props.location.state.id;
    var data = {
      toState : "Closed"
    };
    axios.patch("http://localhost:8080/hackathons/" + ID, data).then(response => {
      window.alert("Hackathon Status updated successfully.");
    });

  }

  handleFinalizedStatus = e =>{
    e.preventDefault();
    const ID = this.props.location.state.id;
    var data = {
      toState : "Finalized"
    };
    axios.patch("http://localhost:8080/hackathons/" + ID, data).then(response => {
      window.alert("Hackathon Status updated successfully.");
    });

  }


  render() {
    console.log(this.state.hackathon);
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div className="hackathon-home">
        {redirectVar}
        <Navbar />

        <div className="hackathon-details">
          <h2>{this.state.hackathon ? this.state.hackathon.name : ""}</h2>
          <br />
          {this.state.hackathon ? this.state.hackathon.description : ""}
          <br />
          <br />
          Start Date:{" "}
          {this.state.hackathon ? this.state.hackathon.startDate : ""}
          <br />
          End Date: {this.state.hackathon ? this.state.hackathon.endDate : ""}
          <br />
          Fee: ${this.state.hackathon ? this.state.hackathon.fee : ""}
          <br />
          Team size: {this.state.hackathon
            ? this.state.hackathon.minSize
            : ""}{" "}
          - {this.state.hackathon ? this.state.hackathon.maxSize : ""}
          <br />
          Status: {this.state.hackathon ? this.state.hackathon.status : ""}
        </div>
        <div className="hackathon-team">
          <h3>Teams</h3>
          {this.state.teams.map(team => (
            <div>
              <Link to="/hackathon">{team.name}</Link>
              <br />
            </div>
          ))}
        </div>
        <div className="hackathon-judge">
          <h3>Judges</h3>
          {this.state.hackathon.judges &&
            this.state.hackathon.judges.map(judge_hackathon => (
              <div>
                {judge_hackathon.screenName}

                <br />
              </div>
            ))}
        </div>
        <div className="hackathon-sponsor">
          <h3>Sponsors</h3>
          {this.state.hackathon.sponsors &&
            this.state.hackathon.sponsors.map(sponsor_hackathon => (
              <div>
                {sponsor_hackathon.name}
                <br />
              </div>
            ))}
        </div>
        <div div className="button-hacks">
        <button type="button" onClick={this.handleOpenStatus} style={{margin:20}} className="btn btn-primary btn-lg">Open</button>
        <button type="button" onClick={this.handleClosedStatus} style={{margin:20}} className="btn btn-warning btn-lg">Closed</button>
        <button type="button" onClick={this.handleFinalizedStatus} style={{margin:20}} className="btn btn-success btn-lg">Finalized</button>
      </div>
      </div>
    );
  }
}

export default MyAdminHackathon;
