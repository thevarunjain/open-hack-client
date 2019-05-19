import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../common/form";
import { Redirect } from "react-router";
import { If, Then, Else } from "react-if";
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
import {rootUrl} from "../common/constant";

class AdminHackathons extends Form {
  constructor() {
    super();
    this.state = {
      hackathons: [],
      data: {},
      isAdmin: false,
      currentPage: 1,
      pageSize: 8
    };
  }

  componentDidMount() {
    if (getJWTAdminStatus()) this.setState({ isAdmin: true });
    const ID = getJWTID();
    setHeader();

    axios
      .get(`${rootUrl}/users/` + ID + "/hackathons")
      .then(response => {
        this.setState({
          hackathons: response.data
        });
      });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    console.log(this.state.hackathons);
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    const paginatedData = paginate(
      this.state.hackathons ? this.state.hackathons.owner : "",
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="hack-home">
        {redirectVar}
        <Navbar />
        <h1>My Hackathons</h1>
        <div className="heading">
          Find, compete, and earn points for your school at the largest, most
          diverse
          <br /> <span>student hackathons in the world.</span>
        </div>
        <If condition={getJWTAdminStatus()}>
          <a className="btn btn-primary create-hack" href="/hackathon/create">
            Create Hackathon
          </a>
        </If>

        <If
          condition={this.state.hackathons && this.state.hackathons.length != 0}
        >
          <Then>
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
                        hack_id={this.state.hackathons}
                        to={{
                          pathname:
                            "/hackathons/adminHackathons/hackathon-view",
                          state: { id: hackathon.id }
                        }}
                        params={{ testvalue: "hello" }}
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
          </Then>
          <Else>
            <div className="empty-admin">
              <h3>There are no hackathons to display</h3>
            </div>
          </Else>
        </If>
      </div>
    );
  }
}
export default AdminHackathons;
