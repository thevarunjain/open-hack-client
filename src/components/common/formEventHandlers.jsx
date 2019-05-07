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

    let data = this.state.first;
    data = e.target.value;
    this.setState({ first: data });
  };

  handleChangeLastName = e => {
    let data = this.state.last;
    data = e.target.value;
    this.setState({ last: data });
  };

  handleChangeTitle = e => {
    let data = this.state.businessTitle;
    data = e.target.value;
    this.setState({ businessTitle: data });
  };

  handleChangeAbout = e => {
    let data = this.state.aboutMe;
    data = e.target.value;
    this.setState({ aboutMe: data });
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
