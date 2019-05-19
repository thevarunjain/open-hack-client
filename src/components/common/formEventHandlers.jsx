import React, { Component } from "react";
import Joi from "joi-browser";

class FormEventHandlers extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = input => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, subSchema); //should abort early
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault(); //to avoid full page loading

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChangeFirstName = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.first;
    data = e.target.value;
    this.setState({ first: data, errors });
  };

  handleChangeLastName = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.last;
    data = e.target.value;
    this.setState({ last: data, errors });
  };

  handleChangeTitle = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.businessTitle;
    data = e.target.value;
    this.setState({ businessTitle: data, errors });
  };

  handleChangeAbout = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.aboutMe;
    data = e.target.value;
    this.setState({ aboutMe: data, errors });
  };

  handleChangeStreet = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.street;
    data = e.target.value;
    this.setState({ street: data, errors });
  };

  handleChangeCity = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.city;
    data = e.target.value;
    this.setState({ city: data, errors });
  };

  handleChangeState = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.state;
    data = e.target.value;
    this.setState({ state: data, errors });
  };

  handleChangeZipcode = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    let data = this.state.zipcode;
    data = e.target.value;
    this.setState({ zipcode: data, errors });
  };
}

export default FormEventHandlers;
