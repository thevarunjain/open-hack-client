import React, { Component } from 'react'
import axios from "axios";
import Hackathon from '../hackathons/hackathon';
import {setHeader} from "../common/auth";
import "../../css/createHackathon.css";
import { rootUrl } from '../common/constant';
export default class Payment extends Component {
    constructor(props){
        super(props);
        this.state ={
            hackathon : "",
            amount : "",
            tid : "",
            hid : "",
            mid : "" 
        }
    }

    componentDidMount(){
        setHeader();
        var tid = this.props.match.params.tid;
        var hid = this.props.match.params.hid;
        var mid = this.props.match.params.mid;

        this.setState({
            tid,
            hid,
            mid
        })
        var url = `${rootUrl}/hackathons/${hid}/teams/${tid}/payment?participantId=${mid}`;
        console.log(url);
          axios.get(url).then(res=>{
                 console.log(res.data);
                 this.setState({
                     hackathon : res.data.hackathon,
                     amount : res.data.amount
                 }, 
                    console.log("Received"))
         })
    }
    foo(){
        var tid = this.state.tid;
        var hid = this.state.hid;
        var mid = this.state.mid;
        var url = `${rootUrl}/hackathons/${hid}/teams/${tid}/payment?participantId=${mid}&amount=${this.state.amount}`;
        console.log(url);
        axios.post(url).then(res=>{
               console.log(res.data);
       })
        window.alert("Payment Done");
    }

  render() {
      console.log("In payment page");
    return (
      <div className = "create-hack-container" >
                <div class="card" style={{marginLeft: "20%", width : "60%"}}>
                <div class="card-header">
                    Open Hackathon
                </div>
                <div class="card-body">
                    <h5 class="card-title">Thanks for accepting the team</h5>
                    <p class="card-text">Hackathon : {this.state.hackathon}</p>
                    <p class="card-text">Amount : {this.state.amount}</p>
                    <button onClick={this.foo.bind(this)} class="btn btn-primary">Pay</button>
                </div>
                </div> 
      </div>
    )
  }
}