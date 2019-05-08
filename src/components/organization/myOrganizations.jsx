import React, { Component } from "react";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import axios from "axios";
import "../../css/myOrganizations.css";
import { If, Then, Else } from "react-if";
import Form from "../common/form";

class MyOrganizations extends Form {
  constructor() {
    super();
    this.state = {
      memberOf: [],
      ownerOf: [],
      data: "",
      search_results: [],
      member: [],
      memberStatus: []
    };
  }
  handleAccept = e => {
    window.alert(e);
  };
  handleReject = e => {
    window.alert("reject");
  };
  handleLeave = e => {
    window.alert("leave");
  };
  componentDidMount() {
    var id = localStorage.getItem("id");

    axios.get("http://localhost:8080/users/" + id).then(response => {
      this.setState(
        {
          memberOf: response.data.memberOf,
          ownerOf: response.data.ownerOf
        },
        function() {
          var ids = [];
          for (let i = 0; i < this.state.ownerOf.length; i++) {
            ids[i] = this.state.ownerOf[i].id;
          }

          var member = [];
          var memberStatus = [];
          for (let i = 0; i < ids.length; i++) {
            axios
              .get(
                "http://localhost:8080/organizations/" + ids[i] + "/memberships"
              )
              .then(response => {
                for (let j = 0; j < response.data.length; j++) {
                  member[j] = response.data[j].member;
                  memberStatus[j] = response.data[j].status;
                }
                this.setState({ member: member });
                this.setState({ memberStatus: memberStatus });
              });
          }
        }
      );
    });
  }

  doSubmit = () => {
    const name = this.state.data;
    axios.get("http://localhost:8080/organizations/" + name).then(response => {
      this.setState({ search_results: response.data });
    });
  };

  handleJoin = () => {
    const id = this.state.search_results.id;
    axios
      .post("http://localhost:8080/organizations/" + id + "/memberships")
      .then(response => {
        window.alert("Organization joined successfully.");
      });
  };
  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="my-orgs">
        {redirectVar}
        <Navbar />
        <br />
        <a className="btn btn-primary create-org" href="/organization/create">
          Create Organization
        </a>
        <br />
        <br />
        <br />
        <div className="owner-orgs">
          <h2>Owner of</h2>
          {this.state.ownerOf.map(data => (
            <div>
              <div className="owner">
                <h3>{data.name}</h3>
                {data.description}
                <br />
                <br />
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Member</th>
                      <th scope="col">Status</th>
                      <th scope="col"> Accept</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.member.map((data1, index1) => (
                      <React.Fragment>
                        {this.state.memberStatus.map((data2, index2) => (
                          <If condition={index1 == index2}>
                            <tr>
                              <td>{data1.screenName}</td>
                              <td>{data2}</td>
                              <td>
                                <button
                                  className="btn btn-success"
                                  onClick={this.handleAccept}
                                >
                                  Accept
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={this.handleReject}
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          </If>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <br />
            </div>
          ))}
        </div>
        <br />
        <br />
        <If condition={this.state.memberOf && this.state.memberOf.length == 0}>
          <Then>
            {" "}
            <div className="member">
              {" "}
              <input
                type="text"
                name="org_name"
                className="form-control"
                placeholder="Organization name"
                onChange={this.handleChange}
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                onClick={this.handleSubmit}
              >
                Search
              </button>
              <div className="search-results">
                <If condition={this.state.search_results.length == 0}>
                  <Then>No organization found with this name</Then>
                  <Else>
                    {this.state.search_results.map(data => ({ data }))}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleJoin}
                    >
                      Join
                    </button>
                  </Else>
                </If>
              </div>
            </div>
          </Then>
          <Else>
            <div className="owner-orgs">
              <h2>Member of</h2>
              <div className="member">
                <h3>{this.state.memberOf.name}</h3>
                {this.state.memberOf.description}
                <button
                  className="btn btn-warning btn-leave"
                  onClick={this.handleLeave}
                >
                  Leave
                </button>
              </div>
            </div>
          </Else>
        </If>
      </div>
    );
  }
}

export default MyOrganizations;
