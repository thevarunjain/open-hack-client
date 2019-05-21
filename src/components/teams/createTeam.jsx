import React, { Component } from "react";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import Navbar from "../common/navbar";
import Form from "../common/form";
import axios from "axios";
import { Redirect } from "react-router";
import "../../css/createHackathon.css";
import { rootUrl } from "../common/constant";

class CreateTeam extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      dataSend: ""
    };
  }

  doSubmit = async e => {
    var data = {
      name: this.state.data.name,
      members: [],
      roles: []
    };

    
  handleSponsorSelection = (selectedOption,i) => {
    var sponsorById=this.state.x;

    if(sponsorById && !sponsorById.includes(selectedOption.id)){    // for unique insertion in x object
          sponsorById[i]=selectedOption.id;
          this.setState({ selectedOption });
          this.setState({ x : sponsorById });
    }else if(this.state.x && this.state.x.includes(selectedOption.id)){
      window.alert("already added")
          this.state.sponsors.splice(i,1);        // to remove the <div>
          this.setState({sponsors: this.state.sponsors})
      
          this.state.discounts.splice(i,1);       //to remove its discount    
          this.setState({discounts: this.state.discounts})
      
          this.state.x.splice(i,1);               // to remove as a sponsor
          this.setState({x: this.state.x})
    }
  }
  
  
  addSponsor(e){
    e.preventDefault();
    this.setState({
      sponsors : [...this.state.sponsors, ""]
    })
  }

  removeSponsor(e,i){
    e.preventDefault();
    
    this.state.sponsors.splice(i,1);
    this.setState({sponsors: this.state.sponsors})

    this.state.discounts.splice(i,1);
    this.setState({discounts: this.state.discounts})

    this.state.x.splice(i,1);
    this.setState({x: this.state.x})

    console.log(this.state);
  }
  
  componentDidMount(){
    setHeader();
    axios.get(rootUrl + "/users")
    .then(users=>{
      // remove isadmin true users.
      var nonAdminUsers = users.data.filter(e=> !e.admin);

      nonAdminUsers.map(e=>{
        e["label"] = e.name.first+ " "+e.name.last;
        e["value"] = e.id
      })
      this.setState({
        allJudges : nonAdminUsers
      })
    }).catch(err=>{

    })

    axios.get(rootUrl + "/organizations").then(org=>{
      org.data.map(e=>{
        e["label"] = e.name;
        e["value"] = e.id
      })
      this.setState({
        allSponsors : org.data
      })
    })
  }




    // var membersName = this.state.data.members
    //   ? this.state.data.members.split(";").map(e => e.trim())
    //   : [];
    // membersName.map(async (name, i) => {
    //   if (name.replace(/\s/gi, "").length != 0) {
    //     setHeader();
    //     var res = await axios.get(rootUrl+"/users?name=" + name);
    //     var jid = Number.parseInt(res.data[0].id, 10) - 1;
    //     data["members"].push(jid + 1);
    //   }
    // });

    // var rolesArray = this.state.data.roles
    //   ? this.state.data.roles.split(";")
    //   : [];

    // data["roles"] = rolesArray.map(e => e.trim());

    // this.setState(
    //   {
    //     dataSend: data
    //   },
    //   function() {
    //     console.log(this.state.dataSend);
    //   }
    // );
  };

  async submit(e) {
    var id = getJWTID();
    var hackathon_id = this.props.location.state.id;
    console.log(this.state.dataSend);
    setHeader();
    await axios
      .post(
        rootUrl+"/hackathons/" +
          hackathon_id +
          "/teams?ownerId=" +
          id,
        this.state.dataSend
      )
      .then(response => {
        window.alert("Team created successfully.");
        // window.location.reload();
        this.props.history.push("/hackathons");
      });
  }

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-body">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <form>
            <div className="org-information">
              <h3>Team Information</h3>
              <br />
              <label>Name of the Team</label>
              <input
                type="text"
                name="name"
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />
              <label>Add Members to team</label>
              
              {
                this.state.members.map((sponsor,i)=>{
                  return(
                    <div class="input-group mb-3" key={i}>
                      <Select key={i} className="css-1pcexqc-container-spon"  value={this.state.x[i] ? this.state.x[i].name : ""}  options={this.state.allMember.filter((e) => !this.state.x.includes(e.id))} onChange={(e)=>{this.handleMemberSelection(e,i)}} /> 
                       <input 
                        required
                        className="form-control"
                        placeholder="discount"
                        style={{marginLeft: "12px", borderRadius: "4px", height: "59px",  marginTop: "0px"}}
                      onChange={(e)=>this.handleDiscountChange(e,i)}
                      value ={this.state.discounts[i]}
                      />
                    <div class="input-group-append" style={{    marginTop: "-11px"}}>  
                      <button class="btn btn-primary btn-remove" onClick={(e)=>this.removeMember(e,i)}>Remove</button>
                    </div>
                    </div>
                  )
                })
              }
              <br/>
              <button className="btn-add" onClick={(e)=>this.addMember(e)}>Add Sponsor </button>
              {/* <input
                type="text"
                name="members"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
              />
              <label>Assign roles to members</label>
              <input
                type="text"
                name="roles"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
              /> */}
            </div>
            <div>
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Finalize Team
              </button>{" "}
              <br />
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.submit.bind(this)}
              >
                Post Team
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
