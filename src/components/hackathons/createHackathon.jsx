import React, { Component } from "react";
import "../../css/createHackathon.css";
import Navbar from "../common/navbar";
import Form from "../common/form";
import { Redirect } from "react-router";
import axios from "axios";
import {
  getToken,
  getJWTUsername,
  getJWTID,
  getJWTScreenName,
  getJWTAdminStatus,
  setHeader
} from "../common/auth";
import {rootUrl} from "../common/constant";
import Select from 'react-select';
var moment = require("moment");

const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];

class CreateHackathon extends Form {
  constructor() {
    super();
    this.state = {
      data: {},
      currentDate: "",
      localStartDate: "",
      localEndDate: "",
      dataSend: "", 
      judges : [],
      sponsors : [],
      discounts: [],
      selectedOption : null
    };
  }

  addJudge(e){
    e.preventDefault();
    this.setState({
      judges : [...this.state.judges, ""]
    })
  }

  handleJudgeChange(e,i){
    e.preventDefault();
    this.state.judges[i]=e.target.value;
    this.setState({judges: this.state.judges})
  }

  removeJudge(i){
    this.state.judges.splice(i,1);
    this.setState({judges: this.state.judges})
  }

  addSponsor(e){
    e.preventDefault();
    this.setState({
      sponsors : [...this.state.sponsors, ""]
    })
  }

  handleSponsorChange(e,i){
    e.preventDefault();
    this.state.sponsors[i]=e.target.value;
    this.setState({sponsors: this.state.sponsors})
  }

  removeSponsor(e,i){
    e.preventDefault();
    this.state.sponsors.splice(i,1);
    this.setState({sponsors: this.state.sponsors})

    this.state.discounts.splice(i,1);
    this.setState({discounts: this.state.discounts})
  }

  // addDiscount(e){
  //   e.preventDefault();
  //   this.setState({
  //     discounts : [...this.state.discounts, ""]
  //   })
  // }

  handleDiscountChange(e,i){
    console.log("In discount change", e.target.value, i)
    e.preventDefault();
    this.state.discounts[i]=e.target.value;
    this.setState({discounts: this.state.discounts})
  }

  // removeDiscount(i){
  //   this.state.discounts.splice(i,1);
  //   this.setState({discounts: this.state.judges})
  // }

  handleSelectionChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  doSubmit = async e => {
    var startDateLocale = this.state.data.start_date;
    var startDate = moment(startDateLocale, "YYYY-MM-DD").toDate();

    var endDateLocale = this.state.data.end_date;
    var endDate = moment(endDateLocale, "YYYY-MM-DD").toDate();

    var data = {
      name: this.state.data.name,
      description: this.state.data.description,
      startDate: startDate,
      endDate: endDate,
      fee: this.state.data.fee,
      minSize: this.state.data.min_size,
      maxSize: this.state.data.max_size,
      judges: [],
      sponsors: [],
      discount: []
    };



    // var judgesName = this.state.data.judges
    //   ? this.state.data.judges.split(";").map(e => e.trim())
    //   : [];

    // judgesName.map(async (name, i) => {
    //   if (name.replace(/\s/gi, "").length != 0) {
    //     setHeader();
    //     var res = await axios.get(rootUrl+"/users?name=" + name);
    //     var jid = Number.parseInt(res.data[0].id, 10) - 1;
    //     data["judges"].push(jid + 1);
    //   }
    // });

    // var discountsArray = this.state.data.discount
    //   ? this.state.data.discount.split(";")
    //   : [];

    // data["discount"] = discountsArray.map(e => Number.parseInt(e.trim(), 10));

    // var sponsorsName = this.state.data.sponsors
    //   ? this.state.data.sponsors.split(";").map(e => e.trim())
    //   : [];

    // sponsorsName.map(async (name, i) => {
    //   if (name.replace(/\s/gi, "").length != 0) {
    //     setHeader();
    //     var res = await axios.get(rootUrl+"/organizations?name=" + name);
    //     var sid = Number.parseInt(res.data[0].id, 10) - 1;
    //     data["sponsors"][i] = sid + 1;
    //   }
    // });

    this.setState(
      {
        dataSend: data
      },
      function() {
        console.log(this.state.dataSend);
      }
    );
  };

  async submit(e) {
    e.preventDefault();
    var id = getJWTID();
    setHeader();
    await axios
      .post(
        rootUrl+"/hackathons?ownerId=" + id,
        this.state.dataSend
      )
      .then(response => {
        window.alert("Hackathon created successfully.");
        // window.location.reload();
        this.props.history.push("/hackathons");
      });
  }

  render() {
    console.log(this.state);
    let redirectVar = null;
    var id = getJWTID();
    if (!id) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div className="create-hack-container">
        {redirectVar}
        <Navbar />
        <hr />

        <div className="org-body">
          <form>
            <div className="org-information">
              <h3>Hackathon Information</h3>
              <br />
              <label>Name </label>
              <input
                type="text"
                name="name"
                required
                className="form-control"
                autoFocus
                placeholder="Name"
                onChange={this.handleChange}
              />
              <label>Description</label>
              <textarea
                required
                name="description"
                placeholder="Atleast 10 characters"
                className="form-control"
                onChange={this.handleChange}
              />
              <label>Start Date</label>
              <input
                type="date"
                required
                name="start_date"
                className="form-control"
                onChange={this.handleChange}
              />

              <label>End Date</label>
              <input
                required
                type="date"
                name="end_date"
                className="form-control"
                onChange={this.handleChange}
              />
              <label>Entry Fee</label>
              <input
                type="number"
                name="fee"
                required
                className="form-control"
                placeholder="Fee"
                onChange={this.handleChange}
              />
              <label>Minimum coders</label>
              <input
                type="text"
                name="min_size"
                required
                className="form-control"
                placeholder="Atleat 1"
                onChange={this.handleChange}
              />
              <label>Maximum coders</label>
              <input
                type="text"
                name="max_size"
                required
                className="form-control"
                placeholder="Maximum 10"
                onChange={this.handleChange}
              />
              <label>Judges</label>
              {/* <input
                type="text"
                name="judges"
                required
                className="form-control"
                placeholder=" Atleast 1 with Semi-colon(;) separated"
                onChange={this.handleChange}
              /> */}
              
     

              <Select isMulti options={scaryAnimals}  onChange={this.handleSelectionChange} />



              {
                this.state.judges.map((judge,i)=>{
                  return(

                    <div class="input-group mb-3" key={i}>
                    <input 
                            required
                            className="form-control"
                          onChange={(e)=>this.handleJudgeChange(e,i)}
                          value ={judge}
                          />
                      <div class="input-group-append">
                        <button  class="btn btn-primary btn-remove" type="button"  onClick={(e)=>this.removeJudge(i)}>Remove</button>

                      </div>
                    </div>
        

                  )
                })
              }
              <div>
              <button className = "btn-add" onClick={(e)=>this.addJudge(e)}>Add Judge</button>

              </div>
                <br/>
              <label>Sponsors (Optional)</label>
              {/* <input
                type="text"
                name="sponsors"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
              />
              <label>Discount in % </label>
              <input
                type="text"
                name="discount"
                className="form-control"
                placeholder="Semi-colon(;) separated"
                onChange={this.handleChange}
              /> */}

              {
                this.state.sponsors.map((sponsor,i)=>{
                  return(
                    <div class="input-group mb-3" key={i}>
                      <input 
                         required
                        placeholder="Sponsor"
                        className="form-control"
                        style={{borderRadius: "4px"}}
                      onChange={(e)=>this.handleSponsorChange(e,i)}
                      value ={sponsor}
                      />
                       <input 
                        required
                        className="form-control"
                        placeholder="discount"
                        style={{marginLeft: "12px", borderRadius: "4px"}}
                      onChange={(e)=>this.handleDiscountChange(e,i)}
                      value ={this.state.discounts[i]}
                      />
                    <div class="input-group-append">  
                      <button class="btn btn-primary btn-remove" onClick={(e)=>this.removeSponsor(e,i)}>Remove</button>
                    </div>
                    </div>
                  )
                })
              }
              <br/>
              <button className="btn-add" onClick={(e)=>this.addSponsor(e)}>Add Sponsor </button>
            </div>
            <div>
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Finalize Hackathon
              </button>{" "}
              <br />
              <button
                type="submit"
                style={{ marginLeft: "41%", width: "fit-content" }}
                className="btn btn-primary"
                onClick={this.submit.bind(this)}
              >
                Ready ? Create
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateHackathon;
