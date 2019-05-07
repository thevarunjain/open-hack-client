import React, { Component } from "react";
import Navbar from "../common/navbar";
import { Link } from "react-router-dom";
import "../../css/viewProfile.css";
import axios from "axios";
import { If } from "react-if";
import { Redirect } from "react-router";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      ID: "",
      IDFlag: false // to check if current user and ID from props are same
    };
  }
  componentDidMount() {
    const ID_props = this.props.id;
    const ID = localStorage.getItem("id");

    this.setState({ ID: ID_props });
    if (ID === ID_props) {
      this.setState({ IDFlag: true });
    }
    // axios.defaults.headers.common["Authorization"] = localStorage.getItem("id");
    axios.get("http://localhost:8080/users/" + ID).then(response => {
      console.log(response);
      this.setState({
        profiles: response.data
      });
    });
  }
  render() {
    let redirectVar = null;
    var id = localStorage.getItem("id");
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    console.log(this.state.profiles);
    return (
      <div className="home">
        {redirectVar}
        <Navbar />
        {this.state.profiles.map(profile => (
          <div className="view-profile-container">
            <div className="view-photo">
              <img
                src={require("../../images/1.jpg")}
                alt="The Traveler hasn't uploaded anything yet"
              />
            </div>
            <div className="full-name">
              <span>
                Hi, I'm {profile.firstname} {profile.lastname}
              </span>
            </div>
            <div className="about">
              <h3>About me</h3>
              {profile.about}
              <br />
              <br />
              <div>Title: {profile.title} </div>
              <div>Organization: {profile.organization}</div>
              <div>
                Address: {profile.street}, {profile.city}, {profile.state} -{" "}
                {profile.zipcode}{" "}
              </div>
            </div>
          </div>
        ))}
        <If condition={this.state.IDFlag}>
          <div className="edit_profile">
            <Link to="/profile-edit">Edit Profile</Link>
          </div>{" "}
        </If>
      </div>
    );
  }
}

export default ViewProfile;
