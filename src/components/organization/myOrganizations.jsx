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
      search_results: []
    };
  }

  componentDidMount() {
    var id = localStorage.getItem("id");
    axios.get("http://localhost:8080/users/" + id).then(response => {
      this.setState({
        memberOf: response.data.memberOf,
        ownerOf: response.data.ownerOf
      });
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
    console.log(this.state.memberOf);
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
        {/* {this.state.ownerOf.map(data => ( */}
        <div className="owner">
          {/* <h3>{data.name}</h3> */}
          address
        </div>
        {/* ))} */}
        <br />
        <br />
        <If condition={this.state.memberOf && this.state.memberOf.length == 0}>
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
          {/* <If
            condition={this.state.memberOf && this.state.memberOf.length != 0}
          >
            {this.state.memberOf.map(data => (
              <div className="member">
                <h3>{data.name}</h3>
                address
              </div>
            ))}
          </If> */}
        </If>
      </div>
    );
  }
}

export default MyOrganizations;
