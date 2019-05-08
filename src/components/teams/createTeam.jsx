import React, { Component } from "react";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import Navbar from "../common/navbar";
import Form from "../common/form";
import axios from "axios";
import { Redirect } from "react-router";

class CreateTeam extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      dataSend: ""
    };
  }

  doSubmit = async e => {
    var data = {
      name: this.state.data.name,
      members: [],
      roles: []
    };
    var membersName = this.state.data.members
      ? this.state.data.members.split(";").map(e => e.trim())
      : [];
    membersName.map(async (name, i) => {
      if (name.replace(/\s/gi, "").length != 0) {
        setHeader();
        var res = await axios.get("http://localhost:8080/users?name=" + name);
        var jid = Number.parseInt(res.data[0].id, 10) - 1;
        data["members"].push(jid + 1);
      }
    });

    var rolesArray = this.state.data.roles
      ? this.state.data.roles.split(";")
      : [];

    data["roles"] = rolesArray.map(e => e.trim());

    this.setState(
      {
        dataSend: data
      },
      function() {
        console.log(this.state.dataSend);
        this.submit();
      }
    );
  };

  async submit(e) {
    var id = getJWTID();
    var hackathon_id = this.props.location.state.id;
    console.log(this.state.dataSend);
    setHeader();
    await axios
      .post(
        "http://localhost:8080/hackathons/" +
          hackathon_id +
          "/teams?ownerId=" +
          id,
        this.state.dataSend
      )
      .then(response => {
        // console.log(response.data);
        window.alert("Team created successfully.");
        window.location.reload();
      });
  }
  render() {
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-body">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <form>
            <div className="org-information">
              <h3>Team Information</h3>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="members"
                className="form-control"
                placeholder="Members semi-colon separated"
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="roles"
                className="form-control"
                placeholder="Roles semi-colon separated"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Create
            </button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTeam;
