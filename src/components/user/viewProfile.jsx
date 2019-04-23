import React, { Component } from "react";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";
import "../../css/viewProfile.css";

class ViewProfile extends Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <div className="view-profile-container">
          <div className="view-photo">
            <img
              src={require("../../images/1.jpg")}
              alt="The Traveler hasn't uploaded anything yet"
            />
          </div>
          <div className="full-name">
            <span>Hi, I'm Firstname Lastname</span>
          </div>
          <div className="about">
            <h3>About me</h3>
            description
            <br />
            <br />
            <div>Title: Business Title </div>
            <div>Organization: Organization Name</div>
            <div>Address: address </div>
          </div>
        </div>
        <div className="edit_profile">
          <Link to="/profile-edit">Edit Profile</Link>
        </div>{" "}
      </div>
    );
  }
}

export default ViewProfile;
