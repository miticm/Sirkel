import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Eventpage from "./Eventpage";
import "./Dashboard.css";
import Settings from "./Settings";
import ProfilePage from "./ProfilePage";
import OrgPage from "./OrgPage";
import UserProfile from "./UserProfile";

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
              case "settings":
                return <Settings />;
              case "profile":
                return <ProfilePage />;
              case "org":
                return <OrgPage />;
              case "connections":
                return <UserProfile />;
              default:
                return <p>ToDo</p>;
            }
          })()}
        </div>
      </div>
    );
  }
}
