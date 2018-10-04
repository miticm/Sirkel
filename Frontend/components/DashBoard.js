import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Eventpage from "./Eventpage";
import OrganizationPage from "./OrganizationPage"
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
              case "organizations":
                return <OrganizationPage />;
              default:
                return <p>Dashboard</p>;
            }
          })()}
        </div>
      </div>
    );
  }
}
