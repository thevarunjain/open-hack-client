import React, { Component } from "react";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";
import "../../css/viewProfile.css";
import axios from "axios";
import { If } from "react-if";
import { Redirect } from "react-router";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      ID: "",
      Organization: ""
    };
  }
  componentDidMount() {
    const ID = getJWTID();
    setHeader();
    axios.get("http://localhost:8080/users/" + ID).then(response => {
      this.setState({
        profiles: response.data
      });
    });
  }
  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    const profile = this.state.profiles;
    console.log("res=", profile);
    return (
      <div className="home">
        {redirectVar}
        <Navbar />

        <div className="view-profile-container">
          <div className="view-photo">
            <img
              src={require("../../images/man.svg")}
              alt="The Traveler hasn't uploaded anything yet"
            />
          </div>
          <div className="full-name">
            <span>
              Hi, I'm {profile.name ? profile.name.first : ""}{" "}
              {profile.name ? profile.name.last : ""}
            </span>
          </div>
          <div className="about">
            <h3>About me</h3>
            {profile.aboutMe}
            <br />
            <br />
            <div>Title: {profile.businessTitle} </div>
            <div>Organization:{" "}
              {profile.memberOf
                ? profile.memberOf.name
                : "No organization joined"}</div>
            <div>
              Address: {profile.address ? profile.address.street : ""},{" "}
              {profile.address ? profile.address.city : ""},{" "}
              {profile.address ? profile.address.state : ""} -{" "}
              {profile.address ? profile.address.zip : ""}{" "}
            </div>
          </div>
        </div>

        {/* <If condition={profile.admin}> */}
          <div className="edit_profile">
            <Link to="/profile-edit">Edit Profile</Link>
          </div>{" "}
        {/* </If> */}
      </div>
    );
  }
}

export default ViewProfile;
