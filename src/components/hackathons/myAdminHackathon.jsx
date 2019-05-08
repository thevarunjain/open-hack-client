import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import Form from "../common/form";
var moment = require('moment');

class MyAdminHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      startDate: "",
      endDate: "",
      currentDate:"",
      teams: []
    };
    this.handleOpenStatus = this.handleOpenStatus.bind(this);
    this.handleClosedStatus = this.handleClosedStatus.bind(this);
    this.handleFinalizedStatus = this.handleFinalizedStatus.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
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

  changeHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitChanges = e =>{
    e.preventDefault();
    const ID = this.props.location.state.id;

    var startDateLocale = this.state.startDate;
    var startDate = moment(startDateLocale, "YYYY-MM-DD").toDate();

    var endDateLocale = this.state.endDate;
    var endDate = moment(endDateLocale, "YYYY-MM-DD").toDate();

    var currentDate = new Date();
    var data = {
      "startDate" : startDate,
      "currentDate" : currentDate,
      "endDate" : endDate
    };
    axios.patch("http://localhost:8080/hackathons/" + ID, data).then(response => {
      window.alert("Hackathon Date updated successfully.");
    });
  }

  render() {
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
          <label> Hackathon Start Date:</label> &nbsp;
          {this.state.hackathon ? this.state.hackathon.startDate : ""}
          <br/>
          <label> Hackathon End Date:</label> &nbsp;
          {this.state.hackathon ? this.state.hackathon.endDate : ""}
          <br/>
          <label> New Start Date:</label>
          <input
              type="date"
              name="startDate"
              // value={this.state.hackathon ? this.state.hackathon.startDate : ""}
              className="form-control"
              onChange={this.changeHandle}
          />
          <label> New End Date:</label>
          <br/>
          <input
              type="date"
              name="endDate"
              // value={this.state.hackathon ? this.state.hackathon.endDate : ""}
              className="form-control"
              onChange={this.changeHandle}
          />
          <label>Fee:</label>
          <input
              type="text"
              name="Fee"
              value={this.state.hackathon ? this.state.hackathon.fee : ""}
              className="form-control"
              disabled
          />
          <label>Team Size:</label><br/>
          Minimum: &nbsp;
          <input
              type="text"
              name="Min"
              value={this.state.hackathon
                  ? this.state.hackathon.minSize
                  : ""}
              className="form-control"
              disabled
          />
          Maximum: &nbsp;
          <input
              type="text"
              name="Max"
              value={this.state.hackathon
                  ? this.state.hackathon.maxSize
                  : ""}
              className="form-control"
              disabled
          />
          <label>Status:</label><br/>
          <input
              type="text"
              name="Status"
              value={this.state.hackathon
                  ? this.state.hackathon.status
                  : ""}
              className="form-control"
              disabled
          />
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
          <button type="button" onClick={this.submitChanges} style={{margin:20}} className="btn btn-success btn-lg">Save Changes</button>
      </div>
      </div>
    );
  }
}

export default MyAdminHackathon;
