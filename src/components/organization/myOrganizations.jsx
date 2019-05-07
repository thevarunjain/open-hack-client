import React, { Component } from "react";
import { Redirect } from "react-router";
import Navbar from "../common/navbar";
import axios from "axios";
import "../../css/myOrganizations.css";

class MyOrganizations extends Component {
  constructor() {
    super();
    this.state = {
      memberOf: [],
      ownerOf: []
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
        {/* {this.state.ownerOf.map(data => ( */}
        <div className="owner">
          {/* <h3>{data.name}</h3> */}
          address
        </div>
        {/* ))} */}
        <br />
        <br />
        {/* {this.state.memberOf.map(data => ( */}
        <div className="member">
          {/* <h3>{data.name}</h3> */}
          address
        </div>
        {/* ))} */}
      </div>
    );
  }
}

export default MyOrganizations;
