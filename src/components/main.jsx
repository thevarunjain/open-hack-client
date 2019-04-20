import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import NotFound from "./common/notFound";
import Login from "./user/login";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/" exact component={Home} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default Main;
