import React, { Component } from "react";
import axios from "axios";
import LandingPage from "./LandingPage";
import serverAddress from "../utils/serverAddress";
export default class Verify extends Component {
  componentDidMount(){
    axios
      .get(`${serverAddress}/users/verify/`+this.props.match.params.id)
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
