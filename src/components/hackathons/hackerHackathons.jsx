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
import { rootUrl } from "../common/constant";

class HackerHackathons extends Form {
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
    if (getJWTAdminStatus) this.setState({ isAdmin: true });
    setHeader();
    const ID= getJWTID();
    axios.get(rootUrl+"/users/" + ID + "/hackathons").then(response => {
        console.log(response.data);
      this.setState({
        hackathons: response.data
      });
    });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }

    console.log(this.state.hackathons.participant);
        var data = [];
      {this.state.hackathons.participant && this.state.hackathons.participant.map(hackathonData => (
          data.push(hackathonData.hackathon)
      ))}
    const paginatedData = paginate(
      data,
      this.state.currentPage,
      this.state.pageSize
    );

      const paginatedJudgeData = paginate(
          this.state.hackathons ? this.state.hackathons.judge : "",
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
          <h2 style={{color:"white"}}> PARTICIPATED HACKATHONS: </h2>
        {paginatedData.map(hackathonDisplay => (
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
                      pathname: "/hackathons/hackerHackathons/hackathon-view",
                      state: { id: hackathonDisplay.id }
                    }}
                  >
                    {hackathonDisplay.name}
                  </Link>
                </h3>
                {hackathonDisplay.startDate} - {hackathonDisplay.endDate}
                <br/>
                {hackathonDisplay.status}
              </div>
            </div>
        ))}

          <h2 style={{color:"white"}}> HACKATHONS TO BE JUDGED: </h2>
          {paginatedJudgeData.map(hackathon => (
              <div className="col-md-6">
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
                                      pathname: "/hackathons/hackerHackathons/hackathon-view",
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
      </div>
    );
  }
}
export default HackerHackathons;
