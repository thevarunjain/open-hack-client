import React, { Component } from "react";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import axios from "axios";
import "../../css/myOrganizations.css";
import { If, Then, Else } from "react-if";
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
  handleAccept(member, org) {
    var requesterId = getJWTID();
    setHeader();
    axios
      .put(
        rootUrl +
          "/organizations/" +
          org.id +
          "/memberships?requesterId=" +
          requesterId +
          "&memberId=" +
          member.id +
          "&toState=Approved"
      )
      .then(response => {
        window.alert("Accepted!");
        window.location.reload();
      });
  }

  handleReject(member, org) {
    var requesterId = getJWTID();
    setHeader();
    axios
      .put(
        rootUrl +
          "/organizations/" +
          org.id +
          "/memberships?requesterId=" +
          requesterId +
          "&memberId=" +
          member.id +
          "&toState=Rejected"
      )
      .then(response => {
        window.alert("Rejected!");
        window.location.reload();
      });
  }

  handleLeave(org) {
    var requesterId = getJWTID();
    setHeader();
    axios
      .put(
        rootUrl +
          "/organizations/" +
          org.id +
          "/memberships?requesterId=" +
          requesterId +
          "&memberId=" +
          requesterId +
          "&toState=Left"
      )
      .then(response => {
        window.alert("Left!");
        window.location.reload();
      });
  }

  handleSearch = () => {
    if (this.state.data.org_name == null)
      window.alert("Organization Name cannot be empty");
    else {
      var requesterId = getJWTID();
      setHeader();
      axios
        .get(rootUrl + "/organizations?name=" + this.state.data.org_name)
        .then(response => {
          this.setState({ search_results: response.data });
        });
    }
  };

  handleJoin = id => {
    var requesterId = getJWTID();
    setHeader();
    axios
      .post(
        rootUrl +
          "/organizations/" +
          id +
          "/memberships?requesterId=" +
          requesterId
      )
      .then(response => {
        window.alert("Request sent successfully!");
      });
  };

  async componentDidMount() {
    var id = getJWTID();
    setHeader();
    axios.get(rootUrl + "/users/" + id).then(response => {
      this.setState(
        {
          memberOf: response.data.memberOf,
          ownerOf: response.data.ownerOf
        },
        async function() {
          var ids = [];
          if (this.state.ownerOf)
            for (let i = 0; i < this.state.ownerOf.length; i++) {
              ids[i] = this.state.ownerOf[i].id;
            }

          var member = [];
          var memberStatus = [];
          for (let i = 0; i < ids.length; i++) {
            setHeader();
            await axios
              .get(rootUrl + "/organizations/" + ids[i] + "/memberships")
              .then(response => {
                var temp = [];
                var tempStatus = [];
                for (let j = 0; j < response.data.length; j++) {
                  temp.push(response.data[j].member);
                  tempStatus.push(response.data[j].status);
                }
                member.push(temp);
                memberStatus.push(tempStatus);
              });
          }

          this.setState({ member: member });
          this.setState({ memberStatus: memberStatus });
        }
      );
    });
  }

  doSubmit = () => {
    const name = this.state.data;
    setHeader();
    axios.get(rootUrl + "/organizations/" + name).then(response => {
      this.setState({ search_results: response.data });
    });
  };

  render() {
    let redirectVar = null;
    var id = getJWTID();
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
          <If condition={!this.state.ownerOf}>
            <Then>
              <div className="owner">
                <h3>You haven't created any organization yet.</h3>
              </div>
            </Then>
            <Else>
              {this.state.ownerOf &&
                this.state.ownerOf.map((data, index) => (
                  <div>
                    <div className="owner">
                      <h3>{data.name}</h3>
                      {data.description}
                      <br />
                      <br />
                      <table className="table table-striped table-hover">
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
                              {data1.map((data3, index3) => (
                                <React.Fragment>
                                  {this.state.memberStatus.map(
                                    (data2, index2) => (
                                      <React.Fragment>
                                        {data2.map((data4, index4) => (
                                          <If
                                            condition={
                                              index1 == index2 &&
                                              index1 == index &&
                                              index3 == index4
                                            }
                                          >
                                            <tr>
                                              <td>{data3.screenName}</td>
                                              <td>{data4}</td>
                                              <td>
                                                <If
                                                  condition={data4 == "Pending"}
                                                >
                                                  <button
                                                    className="btn btn-success"
                                                    onClick={() =>
                                                      this.handleAccept(
                                                        data3,
                                                        data
                                                      )
                                                    }
                                                  >
                                                    Accept
                                                  </button>
                                                </If>
                                              </td>
                                              <td>
                                                <If
                                                  condition={data4 == "Pending"}
                                                >
                                                  <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                      this.handleReject(
                                                        data3,
                                                        data
                                                      )
                                                    }
                                                  >
                                                    Reject
                                                  </button>
                                                </If>
                                              </td>
                                            </tr>
                                          </If>
                                        ))}
                                      </React.Fragment>
                                    )
                                  )}
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <br />
                  </div>
                ))}
            </Else>
          </If>
        </div>
        <br />
        <br />
        <If condition={Object.keys(this.state.memberOf).length != 0}>
          <Then>
            <div className="owner-orgs">
              <h2>Member of</h2>
              <div className="member">
                <h3>{this.state.memberOf ? this.state.memberOf.name : ""}</h3>
                {this.state.memberOf ? this.state.memberOf.description : ""}
                <button
                  className="btn btn-warning btn-leave"
                  onClick={() => this.handleLeave(this.state.memberOf)}
                >
                  Leave
                </button>
              </div>
            </div>
          </Then>
          <Else>
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
                onClick={this.handleSearch}
              >
                Search
              </button>
              <div className="search-results">
                <If condition={this.state.search_results.length == 0}>
                  <Then>No organization found </Then>
                  <Else>
                    {this.state.search_results.map(data => (
                      <div key={data.id}>
                        <h3>{data.name}</h3> <br />
                        {data.description}
                        <button
                          type="submit"
                          className="btn btn-primary btn-join"
                          // onClick={this.handleJoin.bind(this)}
                          onClick={() => this.handleJoin(data.id)}
                        >
                          Join
                        </button>
                        {/* <hr /> */}
                      </div>
                    ))}
                  </Else>
                </If>
              </div>
            </div>
          </Else>
        </If>
      </div>
    );
  }
}

export default MyOrganizations;
