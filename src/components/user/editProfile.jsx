import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/editProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FormEventHandlers from "../common/formEventHandlers";

class EditProfile extends FormEventHandlers {
  constructor() {
    super();
    this.state = {
      screenname: "",
      firstname: "",
      lastname: "",
      title: "",
      about: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      organization: "",
      id: ""
    };
  }

  componentDidMount() {
    const ID = localStorage.getItem("id");

    axios.get("http://localhost:3001/users/" + ID).then(response => {
      this.setState({
        screenname: response.data.screenname,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        title: response.data.title,
        about: response.data.about,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        zipcode: response.data.zipcode,
        organization: response.data.organization,
        id: response.data.id
      });
    });
  }

  doSubmit = e => {
    var profile = {
      screenname: this.state.screenname,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      title: this.state.title,
      about: this.state.about,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      organization: this.state.organization,
      id: this.state.id
    };

    console.log(profile);

    const ID = localStorage.getItem("id");

    axios.patch("http://localhost:3001/users/" + ID, profile).then(response => {
      window.alert("Profile updated successfully.");
    });
  };
  render() {
    return (
      <div className="profile-home">
        <Navbar />
        <hr />

        <div className="profile">
          <div className="profile-photo">
            <input type="file" className="upload_profile_photo" name="files" />
            <img
              src={require("../../images/1.jpg")}
              width="300"
              height="200"
              alt="User has not uploaded anything yet"
            />
          </div>
          <br />
          <h1 className="name">
            <span>Screenname</span>
          </h1>
        </div>
        <div className="profile-body">
          <form>
            <div className="profile-information">
              <h3>Profile Information</h3>
              <br />
              <input
                type="text"
                name="screenname"
                className="form-control"
                autoFocus
                placeholder="Screen Name"
                disabled
                defaultValue={this.state.screenname}
              />
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First Name"
                defaultValue={this.state.firstname}
                onChange={this.handleChangeFirstName}
              />
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Last Name"
                defaultValue={this.state.lastname}
                onChange={this.handleChangeLastName}
              />
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Business Title"
                defaultValue={this.state.title}
                onChange={this.handleChangeTitle}
              />
              <textarea
                name="about"
                placeholder="About me"
                className="form-control"
                defaultValue={this.state.about}
                onChange={this.handleChangeAbout}
              />
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street Address"
                defaultValue={this.state.street}
                onChange={this.handleChangeStreet}
              />
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                defaultValue={this.state.city}
                onChange={this.handleChangeCity}
              />
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                defaultValue={this.state.state}
                onChange={this.handleChangeState}
              />
              <input
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Zipcode"
                defaultValue={this.state.zipcode}
                onChange={this.handleChangeZipcode}
              />
              <input
                type="text"
                name="organization"
                className="form-control"
                placeholder="Organization"
                defaultValue={this.state.organization}
                onChange={this.handleChangeOrganization}
              />
            </div>
            <div className="view_profile">
              <Link
                className="btn btn-primary"
                to={{
                  pathname: "/profile",
                  state: { id: this.state.id }
                }}
              >
                View Profile
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Save
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}
export default EditProfile;
