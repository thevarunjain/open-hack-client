import React, { Component } from "react";
import "../../css/notFound.css";
import Navbar from "./navbar";

class NotFound extends Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <p className="notfound">The page you have requested cannot be found</p>
      </div>
    );
  }
}

export default NotFound;
