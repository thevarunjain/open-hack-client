import React, { Component } from 'react'
import { Route, BrowserRouter } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import firebase from "../Firebase"

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
           <Route path="/" component={Homepage} exact/>
           <Route path="/firebase" component={firebase} exact/>

        </div>
      </BrowserRouter>
    )
  }
}
