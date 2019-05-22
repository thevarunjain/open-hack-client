import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import NotFound from "./common/notFound";
import Login from "./user/login";
import Signup from "./user/signup";
import SignupConfirmation from "./user/signupConfirmation";
import Hackathons from "./hackathons/hackathons";
import ViewProfile from "./user/viewProfile";
import EditProfile from "./user/editProfile";
import Firebase from "./Firebase";
import CreateOrganization from "./organization/createOrganization";
import MyOrganizations from "./organization/myOrganizations";
import CreateHackathon from "./hackathons/createHackathon";
import HackerHackathons from "./hackathons/hackerHackathons";
import AdminHackathons from "./hackathons/adminHackathons";
import MyHackerHackathon from "./hackathons/myHackerHackathon";
import MyAdminHackathon from "./hackathons/myAdminHackathon";
import Hackathon from "./hackathons/hackathon";
import CreateTeam from "./teams/createTeam";
import Payment from "./teams/Payment";
import awss3 from "./common/awss3";

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
        <Route path="/hackathon/create" exact component={CreateHackathon} />
        <Route
          path="/hackathons/hackerHackathons"
          exact
          component={HackerHackathons}
        />
        <Route
          path="/hackathons/adminHackathons"
          exact
          component={AdminHackathons}
        />
        <Route
          path="/hackathons/hackerHackathons/hackathon-view"
          exact
          component={MyHackerHackathon}
        />
        <Route
          path="/hackathons/adminHackathons/hackathon-view"
          exact
          component={MyAdminHackathon}
        />
        <Route
          path="/organization/create"
          exact
          component={CreateOrganization}
        />
        <Route path="/organizations" exact component={MyOrganizations} />
        <Route path="/team/create" exact component={CreateTeam} />
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/" exact component={Home} />
        <Route path="/firebase" exact component={Firebase} />
        <Route path="/payments/:hid/:tid/:mid" exact component={Payment} />
        <Route path="/s3" exact component={awss3}/>
        <Redirect to="/not-found" />

      </Switch>
    );
  }
}

export default Main;
