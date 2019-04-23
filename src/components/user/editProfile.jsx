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
                placeholder="First and Last Name"
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
              <textarea
                name="address"
                placeholder="Address"
                className="form-control"
              />
              <select className="form-control">
                <option disabled selected>
                  Organization
                </option>
                <option>Org 1</option>
                <option>Org 2</option>
                <option>Org 3</option>
              </select>
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
              Save changes
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}
export default EditProfile;
