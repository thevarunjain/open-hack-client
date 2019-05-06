import React, { Component } from "react";

class FormEventHandlers extends Component {
  handleSubmit = e => {
    e.preventDefault(); //to avoid full page loading

    // const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    this.doSubmit();
  };

  handleChangeFirstName = e => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(e.currentTarget);
    // if (errorMessage) {
    //   errors[e.currentTarget.name] = errorMessage;
    // } else delete errors[e.currentTarget.name];

    let data = this.state.firstname;
    data = e.target.value;
    this.setState({ firstname: data });
  };

  handleChangeLastName = e => {
    let data = this.state.lastname;
    data = e.target.value;
    this.setState({ lastname: data });
  };

  handleChangeTitle = e => {
    let data = this.state.title;
    data = e.target.value;
    this.setState({ title: data });
  };

  handleChangeAbout = e => {
    let data = this.state.about;
    data = e.target.value;
    this.setState({ about: data });
  };

  handleChangeStreet = e => {
    let data = this.state.street;
    data = e.target.value;
    this.setState({ street: data });
  };

  handleChangeCity = e => {
    let data = this.state.city;
    data = e.target.value;
    this.setState({ city: data });
  };

  handleChangeState = e => {
    let data = this.state.state;
    data = e.target.value;
    this.setState({ state: data });
  };

  handleChangeZipcode = e => {
    let data = this.state.zipcode;
    data = e.target.value;
    this.setState({ zipcode: data });
  };

  handleChangeOrganization = e => {
    let data = this.state.organization;
    data = e.target.value;
    this.setState({ organization: data });
  };
}

export default FormEventHandlers;
