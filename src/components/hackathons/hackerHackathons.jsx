import React, { Component } from "react";
import Navbar from "../common/navbar";
import "../../css/hackathons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../common/form";
import { Redirect } from "react-router";
import { If } from "react-if";
import { paginate } from "../utils/paginate";
import Pagination from "../common/pagination";

class HackerHackathons extends Form {
    constructor() {
        super();
        this.state = {
            hackathons: [],
            data: {},
            isAdmin: false,
            currentPage: 1,
            pageSize: 8
        };
    }

    componentDidMount() {
        const username = localStorage.getItem("username");
        if (username.includes("@sjsu.edu")) this.setState({ isAdmin: true });

        axios.get("http://localhost:8080/hackathons/my").then(response => {
            console.log(response.data);
            this.setState({
                hackathons: response.data
            });
        });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    render() {
        let redirectVar = null;
        var id = localStorage.getItem("id");
        if (!id) {
            redirectVar = <Redirect to="/home" />;
        }

        const paginatedData = paginate(
            this.state.hackathons ? this.state.hackathons : "",
            this.state.currentPage,
            this.state.pageSize
        );
        return (
            <div className="hack-home">
                {redirectVar}
                <Navbar />
                <h1>My PERSONAL HACAKTHONS SPACE</h1>
                <div className="heading">
                    Find, compete, and earn points for your school at the largest, most
                    diverse
                    <br /> <span>student hackathons in the world.</span>
                </div>
                {paginatedData.map(hackathon => (
                    <div className="hackathons-list">
                        <div className="hackathon">
                            <img
                                src={require("../../images/9.jpg")}
                                width="250"
                                height="250"
                            />
                            <div className="hackathon-info">
                                <h3>
                                    <Link
                                        className="link"
                                        hack_id = {this.state.hackathons}
                                        to={{
                                            pathname: "/hackathons/hackerHackathons/hackathon-view",
                                            state: { id: hackathon.id }
                                        }}
                                        params={{testvalue:"hello"}}
                                    >
                                        {hackathon.name}
                                    </Link>
                                </h3>
                                {hackathon.startDate} - {hackathon.endDate}
                                <br />
                                {hackathon.status}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="general_pagination">
                    <Pagination
                        itemsCount={
                            this.state.hackathons ? this.state.hackathons.length : ""
                        }
                        pageSize={this.state.pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={this.state.currentPage}
                    />
                </div>
            </div>
        );
    }
}
export default HackerHackathons;
