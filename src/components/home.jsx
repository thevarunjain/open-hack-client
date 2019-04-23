import React, { Component } from "react";
import "../css/home.css";
import HomeBody from "./homeBody";
import Navbar from "./common/navbar";

class Home extends Component {
  render() {
    return (
      <div className="home">
        {
          <React.Fragment>
            <Navbar />
            <HomeBody />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default Home;
