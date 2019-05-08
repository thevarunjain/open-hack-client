import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import {If} from "react-if";

class MyHackerHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      hackathons: [],
      grades: "",
      data: [],
      submissionLink: "",
      role: "participant",
      teams: []
    };
    this.submitGrades = this.submitGrades.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSubmission = this.submitSubmission.bind(this);
  }

  componentDidMount() {
    const ID = this.props.location.state.id;
    console.log("id=", ID);
    const userId = getJWTID();
    setHeader();
    axios.get("http://localhost:8080/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
      for(var i=0; i<response.data.judges.length; i++){
        if(response.data.judges[i].id === userId) {
          this.setState({role:"judge"})
          break;
        }
      }
    });

    setHeader();
    axios.get("http://localhost:8080/users/" + userId + "/hackathons").then(response => {
      console.log(response.data);
      this.setState({
        hackathons: response.data
      });
    });
    setHeader();
    axios
      .get("http://localhost:8080/hackathons/" + ID + "/teams")
      .then(response => {
        console.log(response.data);
        this.setState({
          teams: response.data
        });
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitGrades = (teamId) =>{

    const ID = this.state.hackathon.id;
    const team_ID = teamId;
    console.log(team_ID);
    const data = {
      grades: this.state.grades
    }
    setHeader();
    axios
        .patch("http://localhost:8080/hackathons/" + ID + "/teams", + team_ID, data)
        .then(response => {
          window.alert("Grade Submitted successfully.");
        });
  }

  submitSubmission = (teamId) =>{

    const ID = this.state.hackathon.id;
    const team_ID = teamId;
    console.log(team_ID);
    const data = {
      submissionLink: this.state.submissionLink
    }
    setHeader();
    axios
        .patch("http://localhost:8080/hackathons/" + ID + "/teams", + team_ID, data)
        .then(response => {
          window.alert("Submission Link Submitted successfully.");
        });
  }

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    var data =[];
    {this.state.hackathons.participant && this.state.hackathons.participant.map(hackathonData => (
        data.push(hackathonData.team)
    ))}
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
          <br/>
          <If condition = {this.state.role !== "judge"}>
          <h3> My Team( {data[0] && data[0].name}) Code Submission: </h3>
          </If>

              <If condition={this.state.role !== "judge"}>
              <div className="input-group-append">
                <input type="text" name = "submissionLink" onChange={this.handleChange} className="form-control" placeholder="" aria-label=""
                       aria-describedby="basic-addon1"/>
                <button className="btn btn-dark" onClick={() =>
                    this.submitSubmission(data[0] && data[0].id)
                } type="button">Submit Submission Link</button>
              </div>
              </If>

        </div>
        <div className="hackathon-team">
          <h3>Teams</h3>
          {this.state.teams.map(team => (
            <div>
              <Link to="/hackathon">{team.name}</Link>
              {this.state.hackathon.judges &&
              this.state.hackathon.judges.map(judge_hackathon => (
                    <If condition={getJWTID() === judge_hackathon.id}>
                      <div className="input-group-append">
                        <input type="text" name = "grades" onChange={this.handleChange} className="form-control" placeholder="" aria-label=""
                               aria-describedby="basic-addon1"/>
                        <button className="btn btn-dark" onClick={() =>
                            this.submitGrades(team.id)
                        } type="button">Submit Grades</button>
                      </div>
                    </If>
              ))}
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
      </div>
    );
  }
}

export default MyHackerHackathon;
