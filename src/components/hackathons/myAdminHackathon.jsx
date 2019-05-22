import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import "../../css/createHackathon.css";
import Select from 'react-select';
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
      expenses : [],
      x : [],
      allExpenses :[],
      getExpenses : [],
      title :"",
      description : "",
      amount : "",
      date : ""
    };
    this.handleOpenStatus = this.handleOpenStatus.bind(this);
    this.handleClosedStatus = this.handleClosedStatus.bind(this);
    this.handleFinalizedStatus = this.handleFinalizedStatus.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.postExpense =  this.postExpense.bind(this);
  }



  componentDidMount() {
    const ID = this.props.location.state.id;
    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
    });

    setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/teams").then(response => {
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
                this.setState({teamGrades : response.data});
                var temp = [];
                if (response.data) {
                  for (let j = 0; j < response.data.members.length; j++) {
                    temp.push(response.data.members[j]);
                    /// add grades 
                  }
                }
                member.push(temp);  
              });
          }

          this.setState({ teamDetails: member });
        }
      );
    });


    // setHeader();
    axios.get(rootUrl + "/hackathons/" + ID + "/expenses").then(response => {
      this.setState(
        {
          allExpenses: response.data
        },
      )}
    ).catch(e=>{
      console.log(e);
    })


  }

    postExpense(e){
      const ID = this.props.location.state.id;

        var data = {
          title : this.state.title,
          description : this.state.description,
          amount : this.state.amount,
          date : this.state.date 
        }

        //&& data.description.length>0 && data.date.length>0
        console.log(data.title.length );
        if(data.title.length==0 || data.amount.length == 0 || data.date.length==0){
          window.alert("One or more field is required");
        }else{
          setHeader();
          axios.post(rootUrl + "/hackathons/" + ID + "/expenses", data).then(response => {
            window.alert("Expense Added");
          }).catch(err=>{
            console.log(err);
          })
        }
}

  handleOpenStatus = e => {
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
          if(e.isFinalized && e.grades == undefined){
            canHackathonFinalize = false;
            window.alert("Cannot finalize hackathon as one or more teams has not been graded");
          }
      })

      if(canHackathonFinalize){
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

  addExpense(e) {
    e.preventDefault();
    this.setState({
      expenses: [...this.state.expenses, ""]
    });
  }

  handlExpenseSelection = (selectedOption,i) => {
    var expensesById=this.state.x;

    if(expensesById && !expensesById.includes(selectedOption.id)){    // for unique insertion in x object
          expensesById[i]=selectedOption.id;
          this.setState({ selectedOption });
          this.setState({ x : expensesById });
    }
  }
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
            axios.patch(rootUrl + "/hackathons/" + this.state.hackathon.id, data).then(response => {
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
    console.log(this.state);
      let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    var teamTable = this.state.teamDetails.map((teams,i)=>{
      return(
        <div>
        <div >
        <div className="hackathon-team-name">{this.state.teams[i].name}  {this.state.teams[i].isFinalized ? "- Finalized" : "- Payment Pending" }</div>
          <div className="hackathon-team-name">{this.state.teams[i].name} Grade:
          {(this.state.hackathon.status === "Closed" || this.state.hackathon.status === "Finalized") ?
              this.state.teams[i].grades === undefined ?" Not Yet Graded": this.state.teams[i].grades
              : " Hackathon is still open"}
          </div>
        </div>
        <table className="table table-striped table-hover">
        <thead>
          <th>Name</th>
          <th>Role</th>
          <th>Amount</th>
          <th>Fee Paid</th>
        </thead>
        <tbody>
          {teams &&
              teams.map(team_data => (
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
      )
    })
    return (
      <div className="hackathon-home" style={{height: "100vx !important"}}> 
        {redirectVar}
        <Navbar />

        <div className="hackathon-details">
          <h2>{this.state.hackathon ? this.state.hackathon.name : ""}</h2>
          <div div className="button-hacks-admin" style={{display : "contents"}}>
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
          
          {/* <button
            type="button"
            onClick={this.submitChanges}
            style={{ margin: 20 }}
            className="btn btn-success btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}

          >
            Change Dates
          </button> */}
        </div>
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
                 <button
            type="button"
            onClick={this.submitChanges}
            style={{ margin: 20 }}
            className="btn btn-success btn-lg"
            disabled={this.state.hackathon.status==="Finalized"}

          >
            Change Dates
          </button>
          <br></br>
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
<br/>
<br/>
<br/>
            <h3>Expense Manager</h3>
                {
                        <div>

                        <table className="table table-striped table-hover">
                        <thead>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Date Created</th>
                        </thead>
                        <tbody>

                        {this.state.allExpenses.map((expense,i)=>(
                
                              <tr>
                                <td>{expense.title}</td>
                                <td>{expense.description ? expense.description : "N/A" }</td>
                                <td>{expense.amount ? "$"+expense.amount : "-" }</td>
                                <td>{expense.date}</td>
                              </tr>
      
                      ))
                      }

                        </tbody>
                      </table>
                    </div>
                      
                      

                }



            {/* <table className="table table-striped table-hover">
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Date Created</th>
          </thead>
            {expenseTable}
        </table> */}
          
            <br></br>
            <br></br>

            <h5>Add New Expense</h5>
                  <div style={{display: "inline-flex", paddingBottom:"5px"}}>
                  <input
                    type="text"
                      required
                      className="form-control"
                      name = "title"
                      placeholder="Title"
                      style={{
                        marginLeft: "12px",
                        borderRadius: "4px",
                        height: "50px",
                        marginTop: "0px",
                        width: "71%"
                      }}
                      onChange={(e)=>this.setState({title:e.target.value})}
                      value={this.state.title}
                    />

                    <input
                    type="text"
                      required
                      className="form-control"
                      name = "description"
                      placeholder="Description (Optional)"
                      style={{
                        marginLeft: "12px",
                        borderRadius: "4px",
                        height: "50px",
                        marginTop: "0px",
                        width: "71%"
                      }}
                      onChange={(e)=>this.setState({description:e.target.value})}
                      value={this.state.description}
                    />

                    <input
                    type="number"
                      min ="0"
                      required
                      className="form-control"
                      name = "amount"
                      placeholder="Amount Optional"
                      style={{
                        marginLeft: "12px",
                        borderRadius: "4px",
                        height: "50px",
                        marginTop: "0px",
                        width: "32%"
                      }}
                      onChange={(e)=>this.setState({amount:e.target.value})}                      
                      value={this.state.amount}
                    />
                    <input
                    type="date"
                      required
                      className="form-control"
                      name = "date"
                      placeholder="Date"
                      style={{
                        marginLeft: "12px",
                        borderRadius: "4px",
                        height: "50px",
                        marginTop: "0px",
                        width: "24%"
                      }}
                      onChange={(e)=>this.setState({date:e.target.value})}                      
                    />
                  
                  </div>
            <br></br>

              <button className="btn-add" onClick={e => this.postExpense(e)}>
                Add Expense{" "}
              </button>
        </div>

      <div>
        <div className="hackathon-team">
          <h3>Teams</h3>
          {teamTable}
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
        <br/>
        <br/>
        <br/>
  </div>
      </div>
    );
  }
}

export default MyAdminHackathon;
