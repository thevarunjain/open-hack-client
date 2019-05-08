import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../common/form";
import { Redirect } from "react-router";
import { If } from "react-if";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";

class Hackathons extends Form {
  constructor() {
    super();
    this.state = {
      hackathons: [],
      profile: [],
      data: {},
      isAdmin: false,
      currentPage: 1,
      pageSize: 8
    };
  }

  componentDidMount() {
    if (getJWTAdminStatus) this.setState({ isAdmin: true });

    setHeader();

    axios.get("http://localhost:8080/hackathons").then(response => {
      this.setState({
        hackathons: response.data
      });
    });
    const ID = localStorage.getItem("id");
    axios.get("http://localhost:8080/users/" + ID).then(response => {
      console.log(response.data);
      this.setState({
        profile: response.data
      });
    });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  doSubmit = e => {
    axios
      .get(
        "http://localhost:8080/hackathons/name/" +
          this.state.data.hackathon_name
      )
      .then(response => {
        this.setState({ hackathons: response.data });
      });
  };

  render() {
    console.log("id=", getJWTID());
    console.log(this.state.profile);

    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    const paginatedData = paginate(
      this.state.hackathons ? this.state.hackathons : "",
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="hack-home">
        {redirectVar}
        <Navbar />
        <h1>Upcoming Hackathons</h1>
        <div className="heading">
          Find, compete, and earn points for your school at the largest, most
          diverse
          <br /> <span>student hackathons in the world.</span>
        </div>
        <If condition={this.state.isAdmin}>
          <a className="btn btn-primary create-hack" href="/hackathon/create">
            Create Hackathon
          </a>
        </If>
        <div className="search">
          <input
            type="text"
            name="hackathon_name"
            className="form-control"
            placeholder="Hackathon name"
            onChange={this.handleChange}
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </div>

        {paginatedData.map(hackathon => (
          <div className="hackathons-list">
            <div className="hackathon">
              <img
                src={require("../../images/9.jpg")}
                width="250"
                height="250"
              />
              <div className="hackathon-info">
                <h3>
                  <Link
                    className="link"
                    to={{
                      pathname: "/hackathon",
                      state: { id: hackathon.id }
                    }}
                  >
                    {hackathon.name}
                  </Link>
                </h3>
                {hackathon.startDate} - {hackathon.endDate}
                <br />
                {hackathon.status}
              </div>
            </div>
          </div>
        ))}
        <div className="general_pagination">
          <Pagination
            itemsCount={
              this.state.hackathons ? this.state.hackathons.length : ""
            }
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
export default Hackathons;
