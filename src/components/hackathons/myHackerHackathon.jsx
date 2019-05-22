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
import { rootUrl } from "../common/constant";
import { If } from "react-if";

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
    axios.get(rootUrl + "/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });

      for (var i = 0; i < response.data.judges.length; i++) {
        if (response.data.judges[i].id === userId) {
          this.setState({ role: "judge" });
          break;
        }
      }
    });

    setHeader();
    axios.get(rootUrl + "/users/" + userId + "/hackathons").then(response => {
      console.log(response.data);
      this.setState({
        hackathons: response.data
      });
    });

    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/teams").then(response => {
      console.log(response.data);
      this.setState({
        teams: response.data
      });
      console.log(this.state.teams);
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitGrades = teamId => {
    const ID = this.state.hackathon.id;
    const team_ID = teamId;
    console.log(team_ID);
    var grades = parseFloat(this.state.grades);
    if(grades >= "0" && grades <= "10"){
      var data ={
        grades : grades
      }
      console.log("Here");
      setHeader();
      axios
          .patch(rootUrl + "/hackathons/" + ID + "/teams/" + team_ID, data)
          .then(response => {
            window.alert("Grade Submitted successfully.");
            window.location.reload();
          });
    }
    else{
      window.alert("Grades value can only be in between 0 and 10");
      window.location.reload();
    }
  };

  submitSubmission = teamId => {
    const ID = this.state.hackathon.id;
    const team_ID = teamId;
    console.log(team_ID, ID);
    const data = {
      submissionURL: this.state.submissionLink
    };
    setHeader();
    axios
      .patch(rootUrl + "/hackathons/" + ID + "/teams/" + team_ID, data)
      .then(response => {
        window.alert("Submission Link Submitted successfully.");
        window.location.reload();
      });
  };

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    var data = [];
    {
      this.state.hackathons.participant &&
        this.state.hackathons.participant.map(hackathonData =>{
            if(this.props.location.state.id === hackathonData.hackathon.id) {
              data.push(hackathonData.team)
            }
        }
        );
    console.log(data);
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
          <br />
          <br/>
          <If condition={this.state.role !== "judge"}>
            <h3> My Team( {data[0] && data[0].name}) Code Submission: </h3>
          </If>
          <If condition={this.state.role !== "judge" && this.state.hackathon.status === "Open"
          && (data[0] && data[0].isFinalized.toString()) === "true"}>
            <div className="input-group-append">
              <input
                type="text"
                name="submissionLink"
                onChange={this.handleChange}
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
              <button
                className="btn btn-dark"
                onClick={() => this.submitSubmission(data[0] && data[0].id)}
                type="button"
              >
                Submit Submission Link
              </button>
            </div>
          </If>

              <If condition={this.state.role !== "judge" && this.state.hackathon.status === "Open"
              && (data[0] && data[0].isFinalized.toString()) === "false"}>
                <h4 style = {{color: "red"}}>Please pay the Hackathon Fees and then code.</h4>
              </If>

          <br/>

          <If condition = {this.state.role !== "judge" && this.state.hackathon.status === "Closed"}>
            <h4 style = {{color: "red"}}>Hackathon Closed, you must have already submitted your code.</h4>
          </If>

          <If condition = {this.state.role !== "judge" && this.state.hackathon.status === "Finalized"}>
            <h4 style = {{color: "green"}}>Hackathon Finalized, you can check for the winner in Teams.</h4>
          </If>
        </div>
        {/*------------------------------------JUDGES------------------------------------------*/}
        <div className="hacker-hackathon-team">
          <h3>Teams</h3>
         {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
              <If condition = {this.state.hackathon.status === "Open" && getJWTID() === judge_hackathon.id}>
                <table className="table table-striped table-hover">
                  <thead>
                  <th>Team Name</th>
                  <th>Grade Submission</th>
                  </thead>
                  <tbody>
                  {this.state.teams &&
                  this.state.teams.map(teamData => (
                      <tr>
                        <td>{teamData.name}</td>
                        <td>{teamData.isFinalized.toString() === "true"?"Hackathon open, grading not allowed"
                            :"Hackathon open, team not paid fee"}</td>
                      </tr>
                      ))}
                  </tbody>
                </table>
              </If>
              ))}


          {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
          <If condition = {getJWTID() === judge_hackathon.id && this.state.hackathon.status === "Created"}>
            <table className="table table-striped table-hover">
              <thead>
              <th>Team Name</th>
              <th>Team Status</th>
              </thead>
                {this.state.teams &&
                this.state.teams.map(teamData => (
                        <tbody>
                        <tr>
                        <td>{teamData.name}</td>
                        <td>{teamData.isFinalized.toString() === "false"? "Team registered but not paid the fee."
                        :"Team registered and paid the fee."}</td>
                        </tr>
                        </tbody>
                    ))}
            </table>
          </If>
          ))}

          {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
              <If condition = {this.state.hackathon.status === "Finalized" && getJWTID() === judge_hackathon.id}>
                <table className="table table-striped table-hover">
                  <thead>
                  <th>Team Name</th>
                  <th>Grade Obtained</th>
                  </thead>
                  <tbody>
                  {this.state.teams &&
                  this.state.teams.map(teamData => (
                      <If condition = {teamData.isFinalized.toString() === "true"}>
                        <tr>
                          <td>{teamData.name}</td>
                          <td>{teamData.grades}</td>
                        </tr>
                      </If>
                  ))}
                  </tbody>
                </table>
              </If>
          ))}

          {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
          <If condition = {this.state.hackathon.status === "Closed" && getJWTID() === judge_hackathon.id}>
                <table className="table table-striped table-hover">
                  <thead>
                  <th>Team Name</th>
                  <th>Grade Obtained</th>
                  <th>Grade Submission</th>
                  </thead>
                  <tbody>
                  {this.state.teams &&
                  this.state.teams.map(teamData => (
                      <If condition = {teamData.isFinalized.toString() === "true"}>
                      <tr>
                        <td>{teamData.name}</td>
                        <td>{teamData.grades}</td>
                        <td>
                          {this.state.hackathon.judges &&
                          this.state.hackathon.judges.map(judge_hackathon => (
                              <If condition={getJWTID() === judge_hackathon.id}>
                                <div className="input-group-append">
                                  <input
                                      type="text"
                                      name="grades"
                                      onChange={this.handleChange}
                                      className="form-control"
                                      placeholder="Enter Grade"
                                      aria-describedby="basic-addon1"
                                  />
                                  <button
                                      className="btn-dark"
                                      onClick={() => this.submitGrades(teamData.id)}
                                      type="button"
                                  >
                                    Submit Grades
                                  </button>
                                </div>
                              </If>
                          ))}
                        </td>
                      </tr>
                      </If>
                  ))}
                  </tbody>
                </table>
            </If>
              ))}

          {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
              <If condition = {this.state.hackathon.status === "Closed" && getJWTID() !== judge_hackathon.id}>
                <table className="table table-striped table-hover">
                  <thead>
                  <th>Team Name</th>
                  <th>Grade Obtained</th>
                  </thead>
                  <tbody>
                  {this.state.teams &&
                  this.state.teams.map(teamData => (
                      <If condition = {teamData.isFinalized.toString() === "true"}>
                        <tr>
                          <td>{teamData.name}</td>
                          <td>{teamData.grades !== undefined?teamData.grades:"Not yet Graded"}</td>
                        </tr>
                      </If>
                  ))}
                  </tbody>
                </table>
              </If>
          ))}

          {this.state.hackathon.judges &&
          this.state.hackathon.judges.map(judge_hackathon => (
              <If condition = {this.state.hackathon.status === "Finalized" && getJWTID() !== judge_hackathon.id}>
                <table className="table table-striped table-hover">
                  <thead>
                  <th>Team Name</th>
                  <th>Grade Obtained</th>
                  </thead>
                  <tbody>
                  {this.state.teams &&
                  this.state.teams.map(teamData => (
                      <If condition = {teamData.isFinalized.toString() === "true"}>
                        <tr>
                          <td>{teamData.name}</td>
                          <td>{teamData.grades}</td>
                        </tr>
                      </If>
                  ))}
                  </tbody>
                </table>
              </If>
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
