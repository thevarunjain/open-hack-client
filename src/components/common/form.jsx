import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  handleSubmit = e => {
    e.preventDefault(); //to avoid full page loading
    const errors = this.validate();
    this.setState({ errors: errors || {} });
     if (errors) return;
    this.doSubmit();
  };


  handleChange = e => {
    if (e.currentTarget.name != "org_name") {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(e.currentTarget);
      if (errorMessage) errors[e.currentTarget.name] = errorMessage;
      else delete errors[e.currentTarget.name];
    }

    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

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
}

export default Form;
