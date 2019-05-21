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
import { rootUrl } from "../common/constant";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      ID: "",
      Organization: "",
      potraitUrl : ""
    };
  }
  async componentDidMount() {
    const ID = getJWTID();
    setHeader();
    await axios.get(rootUrl + "/users/" + ID).then(response => {
      this.setState({
        profiles: response.data,
        potraitUrl : response.data.potraitURL
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
         { console.log(this.state.profiles.portraitURL)}
            <img
              src={this.state.profiles.portraitURL ? this.state.profiles.portraitURL :  require("../../images/man.svg")}
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
            {profile.aboutMe ? (
              <div>
                <h3>About</h3>
                {profile.aboutMe}
              </div>
            ) : (
              ""
            )}
            {/* {profile.aboutMe ? profile.aboutMe : "No description provided"} */}
            <br />
            <br />
            <div>
              {profile.businessTitle ? (
                <div>Title: {profile.businessTitle}</div>
              ) : (
                ""
              )}
            </div>
            <div>
              {profile.memberOf ? (
                profile.memberOf.name ? (
                  <div>Organization: {profile.memberOf.name}</div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div>
              {profile.address ? (
                profile.address.street ? (
                  <div>Street: {profile.address.street}</div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <br />
              {profile.address ? (
                profile.address.city ? (
                  <div>City: {profile.address.city}</div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {profile.address ? (
                profile.address.state ? (
                  <div>State: {profile.address.state}</div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {profile.address ? (
                profile.address.zip ? (
                  <div>Zipcode: {profile.address.zip}</div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {/* Address: {profile.address ? profile.address.street : ""},{" "}
              {profile.address ? profile.address.city : ""},{" "}
              {profile.address ? profile.address.state : ""} -{" "}
              {profile.address ? profile.address.zip : ""}{" "} */}
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
