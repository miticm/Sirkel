import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Eventpage from "./Eventpage";
import "./Dashboard.css";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar className="dashboard-sidebar" />
        <div className="dashboard-content">
          {(() => {
            switch (this.props.show) {
              case "events":
                return <Eventpage />;
              default:
                return <p>Dashboard</p>;
            }
          })()}
        </div>
      </div>
    );
  }
}
