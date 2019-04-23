import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/editProfile.css";
import { Link } from "react-router-dom";

class EditProfile extends Component {
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
              />
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Business Title"
              />
              <textarea
                name="about"
                placeholder="About me"
                className="form-control"
              />
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Street Address"
              />
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
              />
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
              />
              <input
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Zipcode"
              />
              <input
                type="text"
                name="organization"
                className="form-control"
                placeholder="Organization"
              />
            </div>
            <div className="view_profile">
              <Link
                className="btn btn-primary"
                to={{
                  pathname: "/profile"
                  // state: { username: username }
                }}
              >
                View Profile
              </Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}
export default EditProfile;
