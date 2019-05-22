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
import Select from 'react-select';


const allRoles = [
  { value: 'Product Manger', label: 'Product Manger' },
  { value: 'Engineer', label: 'Engineer' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Other', label: 'Other' }
];

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      x : [],
      members : [],
      role : [],
      allMembers :[]
    };
  }


  addMember(e){
    e.preventDefault();
    this.setState({
      members : [...this.state.members, ""]
    })
  }

  removeMember(e,i){
    e.preventDefault();
    
    this.state.members.splice(i,1);
    this.setState({members: this.state.members})

    this.state.role.splice(i,1);
    this.setState({role: this.state.role})

    this.state.x.splice(i,1);
    this.setState({x: this.state.x})

    console.log(this.state);
  }

  handleMemberSelection = (selectedOption,i) => {
    var memberById=this.state.x;

    if(memberById && !memberById.includes(selectedOption.id)){    // for unique insertion in x object
          memberById[i+1]=selectedOption.id;
          this.setState({ selectedOption });
          this.setState({ x : memberById });
    } 
  }

  handleRoleSelection = (selectedOption,i) => {
    console.log(selectedOption);
    this.state.role[i+1]=selectedOption.label;
    this.setState({role: this.state.role})
  }

  componentDidMount(){
    var hackathon_id = this.props.location.state.id;
    setHeader();
    var currrenUsertId = getJWTID();

    var teamMembers = this.state.x;
    var teamMembersRoles = this.state.role;
    teamMembers.push(currrenUsertId);
    teamMembersRoles.push("Team Lead");
      this.setState({
        x :  teamMembers,
        role : teamMembersRoles
      })

    axios.get(`${rootUrl}/users`)
    .then(allUsers=>{
        console.log(allUsers.data);

                  axios.get(`${rootUrl}/hackathons/${hackathon_id}/members`)
                  .then(users=>{
                    // remove isadmin true users.
                    var nonEligibleTeamMember =[];
                    if(users.data){
                      if(users.data.judges){
                        users.data.judges.map(e=>{nonEligibleTeamMember.push(e.id)});
                      } 
                      if(users.data.participants){
                        users.data.participants.map(e=>{nonEligibleTeamMember.push(e.id)});
                      }if(currrenUsertId){
                        nonEligibleTeamMember.push(currrenUsertId)
                      }
                    }  
                    // Removed all Judges and particpants
                    console.log(nonEligibleTeamMember);
                    // Remove Admin users
                    var eligibleTeamMember = allUsers.data.filter(e=> !e.admin);

                    eligibleTeamMember = eligibleTeamMember.filter(e => !nonEligibleTeamMember.includes(e.id));

                    eligibleTeamMember.map(e=>{
                      e["label"] = e.name.first+ " "+e.name.last;
                      e["value"] = e.id
                    })
                    this.setState({
                      allMembers : eligibleTeamMember
                    })
                  }).catch(err=>{
                         console.log(err);
                  })
  }).catch(err=>{
    console.log(err);
  })
  }
  
  doSubmit = e => {
    e.preventDefault();
    var {id, maxSize, minSize} = this.props.location.state;
    var teamSize = this.state.x.length;
    console.log(teamSize,maxSize, minSize);
    console.log(teamSize>=minSize && teamSize<=maxSize);
    if(this.state.name.length == 0) window.alert("Team name is required")
    if(teamSize>=minSize && teamSize<=maxSize){
      var data = {
        name: this.state.name,
        members: this.state.x,
        roles: this.state.role
      };
        var id = getJWTID();
        var hackathon_id = this.props.location.state.id;
        console.log(data);
        setHeader();
        axios
          .post(
            rootUrl + "/hackathons/" + hackathon_id + "/teams",data)
          .then(response => {
            window.alert("Team created successfully.");
            // window.location.reload();
            this.props.history.push("/hackathons");
          });
    }else{
      window.alert("Minimum "+ minSize+ " and Maximum "+maxSize+ " members are required");
    }
  };

  render() {
    console.log(this.state);
    var {id, maxSize, minSize} = this.props.location.state;
    var teamSize = this.state.x.length;
    console.log(teamSize,maxSize, minSize);
    console.log(teamSize>=minSize && teamSize<=maxSize);
    
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-body">
        {redirectVar}
        <Navbar />

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
                required
                placeholder="Name"
                onChange={(e)=> this.setState({name: e.target.value})}
              />
              <label>Add Members to team</label>
              
              {
                this.state.members.map((member,i)=>{
                  return(
                    <div class="input-group mb-3" key={i}>
                    <Select placeholder="Users" key={i} className="css-1pcexqc-container-spon" options={this.state.allMembers.filter((e) => !this.state.x.includes(e.id))} onChange={(e)=>{this.handleMemberSelection(e,i)}} /> 
                      <Select placeholder="Roles" key={i} className="css-1pcexqc-container-spon" options={allRoles} onChange={(e)=>{this.handleRoleSelection(e,i)}} /> 
                    
                    <div class="input-group-append" style={{    marginTop: "-11px"}}>  
                      {/* <button class="btn btn-primary btn-remove" onClick={(e)=>this.removeMember(e,i)}>Remove</button> */}
                    </div>
                    </div>
                  )
                })
              }
              <br/>
              <button className="btn-add" onClick={(e)=>this.addMember(e)}>Add Member </button>
            </div>
            <div>
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.doSubmit.bind(this)}
              >
               Post Team
              </button>{" "}
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
