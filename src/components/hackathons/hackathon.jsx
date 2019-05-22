import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import Form from "../common/form";
import { If } from "react-if";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import { rootUrl } from "../common/constant";

class Hackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      teams: [],
      members: [],
      nonEligibleTeamMember: []
    };
  }

  componentDidMount() {
    const ID = this.props.location.state ? this.props.location.state.id : "";
    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
    });
    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/members")
        .then(users=>{
          console.log(users)
      if(users.data){
        if(users.data.judges){
          users.data.judges.map(e=>{this.state.nonEligibleTeamMember.push(e.id)});
        }
        if(users.data.participants){
          users.data.participants.map(e=>{this.state.nonEligibleTeamMember.push(e.id)});
        }
      }
      console.log(this.state.nonEligibleTeamMember);
    });

    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/teams").then(response => {
      this.setState({
        teams: response.data
      });
    });
  }

  render() {
    console.log(this.state.hackathon);
    console.log(this.state.members);
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div className="hackathon-home" style={{height: "-webkit-fill-available"}}>
        {redirectVar}
        <Navbar />

        <div className="hackathon-details" style={{height: "-webkit-fill-available", marginTop : "-1%"}}>
          <If
            condition={
              !getJWTAdminStatus() && this.state.hackathon.status === "Created"
                && this.state.nonEligibleTeamMember === getJWTID()
            }
          >
            <Link
              className="btn btn-primary create-team"
              to={{
                pathname: "/team/create",
                state: { id: this.props.location.state.id, minSize : this.state.hackathon.minSize, maxSize : this.state.hackathon.maxSize  }
              }}
            >
              Create Team
            </Link>
          </If>
          <h2>{this.state.hackathon ? this.state.hackathon.name : ""}</h2>
          <br />
          {this.state.hackathon ? this.state.hackathon.description : ""}
          <br />
          <label> Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={this.state.hackathon ? this.state.hackathon.startDate : ""}
            className="form-control"
            disabled
          />
          <label> End Date:</label>
          <br />
          <input
            type="date"
            name="endDate"
            value={this.state.hackathon ? this.state.hackathon.endDate : ""}
            className="form-control"
            disabled
          />
          <label>Fee:</label>
          <input
            type="text"
            name="Fee"
            value={this.state.hackathon ? this.state.hackathon.fee : ""}
            className="form-control"
            disabled
          />
          <label>Team Size:</label>
          <br />
          Minimum: &nbsp;
          <input
            type="text"
            name="Min"
            value={this.state.hackathon ? this.state.hackathon.minSize : ""}
            className="form-control"
            disabled
          />
          Maximum: &nbsp;
          <input
            type="text"
            name="Max"
            value={this.state.hackathon ? this.state.hackathon.maxSize : ""}
            className="form-control"
            disabled
          />
          <label>Status:</label>
          <br />
          <input
            type="text"
            name="Status"
            value={this.state.hackathon ? this.state.hackathon.status : ""}
            className="form-control"
            disabled
          />
        </div>
        <div className="hackathon-team">
          <h3>Teams</h3>
          {this.state.teams.map(team => (
            <div>
              {/* <Link to="/hackathon">{team.name}</Link> */}
              {team.name}
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
      </div>
    );
  }
}

export default Hackathon;
