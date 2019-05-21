import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import Form from "../common/form";
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
class MyAdminHackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      startDate: "",
      endDate: "",
      currentDate: "",
      teams: [],
      teamDetails: [],
      done : ""
    };
    this.handleOpenStatus = this.handleOpenStatus.bind(this);
    this.handleClosedStatus = this.handleClosedStatus.bind(this);
    this.handleFinalizedStatus = this.handleFinalizedStatus.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
  }

  componentDidMount() {
    const ID = this.props.location.state.id;
    // console.log("id=", ID);
    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
    });
    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/teams").then(response => {
      console.log(response.data);
      this.setState(
        {
          teams: response.data
        },
        async function() {
          var ids = [];
          if (this.state.teams)
            for (let i = 0; i < this.state.teams.length; i++) {
              ids[i] = this.state.teams[i].id;
            }

          var member = [];
          for (let i = 0; i < ids.length; i++) {
            setHeader();
            await axios
              .get(rootUrl + "/hackathons/" + ID + "/teams/" + ids[i])
              .then(response => {
                // console.log(response.data);
                var temp = [];
                if (response.data) {
                  for (let j = 0; j < response.data.members.length; j++) {
                    temp.push(response.data.members[j]);
                  }
                }
                member.push(temp);  
              });
          }

          this.setState({ teamDetails: member });
        }
      );
    });
  }

  handleOpenStatus = e => {
    console.log(this.state.hackathon.status);
    console.log(this.state.hackathon.status==="Finalized");
    
    e.preventDefault();
    if(this.state.hackathon.status!=="Finalized"){
    const ID = this.props.location.state.id;
    var currentDate = new Date();
    // Check if any team is graded if yes then do not re open
      console.log(this.state.teams);
       var canHackathonOpen = true;
      this.state.teams.map(e=>{
          if(e.grades){
            canHackathonOpen = false;
            window.alert("Cannot re open hackathon as one or more teams has been graded");
          }
      })

      if(canHackathonOpen){
        var data = {
          toState: "Open",
          startDate: currentDate,
        };
        setHeader();
        axios.patch(rootUrl + "/hackathons/" + ID, data).then(response => {
          window.alert("Hackathon Status updated successfully.");
        });
      }
    }else{
      window.alert("Hackathon has been finalized. No more changes allowed");
    }

  };

  handleClosedStatus = e => {
    console.log(this.state.hackathon.status);
    console.log(this.state.hackathon.status==="Finalized");
    
    e.preventDefault();
    if(this.state.hackathon.status!=="Finalized"){
      const ID = this.props.location.state.id;
      var currentDate = new Date();
      var data = {
        toState: "Closed",
        endDate : currentDate
      };
      setHeader();
      axios.patch(rootUrl + "/hackathons/" + ID, data).then(response => {
        window.alert("Hackathon Status updated successfully.");
      });
    }else{
      window.alert("Hackathon has been finalized. No more changes allowed");
    }

  };

  handleFinalizedStatus = e => {
    if(this.state.hackathon.status!=="Finalized"){
    e.preventDefault();
    const ID = this.props.location.state.id;
   var canHackathonFinalize = true;

    this.state.teams.map(e=>{
          if(e.grades == null){
            canHackathonFinalize = false;
            window.alert("Cannot finalize hackathon as one or more teams has not been graded");
          }
      })

      if(canHackathonFinalize){
        console.log("....",this.state.done);
        var data = {
          toState: "Finalized"
        };
        setHeader();
        axios.patch(rootUrl + "/hackathons/" + ID, data).then(response => {
          window.alert("Hackathon Status updated successfully.");
        });
      }
    }else{
      window.alert("Hackathon is already finalized");
    }
  };

  changeHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitChanges = e => {
    e.preventDefault();
    const ID = this.props.location.state.id;
    
console.log(this.state.hackathon)
    var startDateLocale = this.state.startDate ? this.state.startDate : this.state.hackathon.startDate ;
    var startDate = moment(startDateLocale, "YYYY-MM-DD").toDate();

    var endDateLocale = this.state.endDate ? this.state.endDate : this.state.hackathon.endDate ;
    var endDate = moment(endDateLocale, "YYYY-MM-DD").toDate();

    var currentDate = new Date();
    currentDate.setHours(0,0,0,0)
    console.log(startDate, endDate, currentDate);
    var status = "";
  
    if(startDate>=currentDate){         // if new start date is not in past 
        if(endDate>=startDate){         // if end date is not less than start date
        
          if(currentDate<=endDate && currentDate>=startDate){
            status="Open";
          }else if(currentDate<startDate){
            status="Created"
          }else if(currentDate>endDate){
            status="Closed"
          }

            var data = {
              startDate: startDate,
              currentDate: currentDate,
              endDate: endDate,
              toState : status
            };
            console.log("...", data);
            setHeader();
            console.log(this.state.hackathon.id);
            axios.patch("http://localhost:8080" + "/hackathons/" + this.state.hackathon.id, data).then(response => {
              window.alert("Hackathon Date updated successfully.");
            }).then(e=>{
              console.log(e);
            }).catch(e=>{
              console.log(e);
            })
          
      
        }else{
           window.alert("End date cannot be less than start date");
        }  
    }else{
      window.alert("Could not change open date to past. Must be today or after.");
    }

    if(endDate == startDate){
      status = "Closed"
   }else{
      status = "Open" 
   }
   




  };

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    console.log(this.state.teamDetails[0]);
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
          <br />
          <label> Hackathon End Date:</label> &nbsp;
          {this.state.hackathon ? this.state.hackathon.endDate : ""}
          <br />
          <label> New Start Date:</label>
          <input
            type="date"
            name="startDate"
            // value={this.state.hackathon ? this.state.hackathon.startDate : ""}
            className="form-control"
            onChange={this.changeHandle}
          />
          <label> New End Date:</label>
          <br />
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
          <table className="table table-striped table-hover">
            <thead>
              <th>Name</th>
              <th>Role</th>
              <th>Amount</th>
              <th>Fee Paid</th>
            </thead>
            <tbody>
              {this.state.teamDetails[0] &&
                this.state.teamDetails[0].map(team_data => (
                  <tr>
                    <td>{team_data.firstName}</td>
                    <td>{team_data.role}</td>
                    <td>{team_data.amount ? "$"+team_data.amount : "-" }</td>
                    <td>{team_data.feePaid === false ? "No" : "Yes"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
        <div className="hackathon-revenue">
          <h3>Revenue</h3>
          <table className="table table-striped table-hover">
            <thead>
              <th>Paid Registration Fee</th>
              <th>Unpaid Registration Fee</th>
              <th>Sponsor Revenue</th>
              <th>Expense</th>
              <th>Profit</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.state.hackathon.earningReport
                    ? "$"+this.state.hackathon.earningReport.paidRegistrationFee
                    : ""}
                </td>
                <td>
                  {this.state.hackathon.earningReport
                    ? "$"+this.state.hackathon.earningReport.unpaidRegistrationFee
                    : ""}
                </td>
                <td>
                  {this.state.hackathon.earningReport
                    ? "$"+this.state.hackathon.earningReport.sponsorRevenue
                    : ""}
                </td>
                <td>
                  {this.state.hackathon.earningReport
                    ? "$"+this.state.hackathon.earningReport.expense
                    : ""}
                </td>
                <td>
                  {this.state.hackathon.earningReport
                    ? "$"+this.state.hackathon.earningReport.profit
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div div className="button-hacks-admin">
          <button
            type="button"
            onClick={this.handleOpenStatus}
            style={{ margin: 20 }}
            className="btn btn-primary btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}

          >
            Open
          </button>
          <button
            type="button"
            onClick={this.handleClosedStatus}
            style={{ margin: 20 }}
            className="btn btn-warning btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}

          >
            Closed
          </button>
          <button
            type="button"
            onClick={this.handleFinalizedStatus}
            style={{ margin: 20 }}
            className="btn btn-danger btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}
          >
            Finalized
          </button>
          
          <button
            type="button"
            onClick={this.submitChanges}
            style={{ margin: 20 }}
            className="btn btn-success btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}

          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default MyAdminHackathon;
