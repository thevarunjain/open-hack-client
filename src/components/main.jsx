import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import NotFound from "./common/notFound";
import Login from "./user/login";
import Signup from "./user/signup";
import SignupConfirmation from "./user/signupConfirmation";
import Hackathons from "./hackathons/hackathons";
import Hackathon from "./hackathons/hackathon";
import ViewProfile from "./user/viewProfile";
import EditProfile from "./user/editProfile";
import CreateOrganization from "./organization/createOrganization";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/confirm" exact component={SignupConfirmation} />
        <Route path="/hackathons" exact component={Hackathons} />
        <Route path="/hackathon" exact component={Hackathon} />
        <Route path="/profile" exact component={ViewProfile} />
        <Route path="/profile-edit" exact component={EditProfile} />
        <Route
          path="/organization/create"
          exact
          component={CreateOrganization}
        />
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/" exact component={Home} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default Main;
