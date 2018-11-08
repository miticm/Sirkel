import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/Navbar";
require("../node_modules/normalize.css/normalize.css");

export default class App extends Component {
  render() {
    return <NavBar />;
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
