import React, { Component } from "react";
import Navbar from "./Appbar";
import LandingPage from "./LandingPage";
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LandingPage />
      </div>
    );
  }
}
