import { Component } from "react";

class Form extends Component {
  handleSubmit = e => {
    e.preventDefault(); //to avoid full page loading

    // const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(e.currentTarget);
    // if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    // else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };
}

export default Form;
