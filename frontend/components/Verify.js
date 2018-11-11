import React, { Component } from "react";
import axios from "axios";
import LandingPage from "./LandingPage";
export default class Verify extends Component {
  componentDidMount(){
    axios
      .get('http://127.0.0.1:5000/users/verify/'+this.props.match.params.id)
      .then(res => {
        if (res.data.success) {
            console.log("verified");
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
        <LandingPage />
    );
  }
}
