import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathon.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Hackathon extends Component {
  constructor() {
    super();
    this.state = {
      hackathon: [],
      teams: []
    };
  }

  componentDidMount() {
    const ID = this.props.id;

    axios.get("http://localhost:3001/hackathons/" + ID).then(response => {
      this.setState({
        hackathon: response.data
      });
    });

    axios
      .get("http://localhost:3001/hackathons/" + ID + "/teams")
      .then(response => {
        this.setState({
          teams: response.data
        });
      });
  }

  render() {
    return (
      <div className="hackathon-home">
        <Navbar />
        {this.state.hackathon.map(data => (
          <div>
            <div className="hackathon-details">
              <h2>{data.name}</h2>
              <br />
              {data.description}
              <br />
              <br />
              Start Date: {data.start_date}
              <br />
              End Date: {data.end_date}
              <br />
              Fee: ${data.fee}
              <br />
              Team size: {data.min_size} - {data.max_size}
              <br />
              Status: {data.status}
            </div>
            <div className="hackathon-team">
              <h3>Teams</h3>
              {this.state.teams.map(team => (
                <div>
                  <Link to="/hackathon">{team.name}</Link>
                  <br />
                </div>
              ))}
            </div>
            <div className="hackathon-judge">
              <h3>Judges</h3>
              {this.state.hackathon.Judges.map(judge_data => (
                <div>
                  <Link
                    to={{
                      pathname: "/profile",
                      state: { id: judge_data.id }
                    }}
                  >
                    {judge_data.first_name} {judge_data.last_name}
                  </Link>
                  <br />
                </div>
              ))}
            </div>
            <div className="hackathon-sponsor">
              <h3>Sponsors</h3>
              {this.state.hackathon.sponsor.map(sponsor_data => (
                <div>
                  {sponsor_data.name}
                  <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Hackathon;
