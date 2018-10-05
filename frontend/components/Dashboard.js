import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Eventpage from "./Eventpage";
import "./Dashboard.css";
import Settings from "./Settings";
import ProfilePage from "./ProfilePage";
import OrgPage from "./OrgPage";
import OrgProfile from "./OrgProfile";
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
              case "orgprofile":
                return <OrgProfile {...this.props} />;
              case "connections":
                return <UserProfile />;
              case "chats":
                return <p>Under development</p>;
              default:
                return <h1>Start to find your sirkel !</h1>;
            }
          })()}
        </div>
      </div>
    );
  }
}
