import React, { Component } from "react";
import Eventpage from "./Eventpage";
import "./Dashboard.css";
import Settings from "./Settings";
import ProfilePage from "./ProfilePage";
import OrgPage from "./OrgPage";
import OrgProfile from "./OrgProfile";
import UserProfile from "./UserProfile";
import ChatRoomList from "./ChatRoomList";
import Message from "./Message";
import Checkout from "./quiz/Checkout";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-content">
        {(() => {
          switch (this.props.show) {
            case "events":
              return <Eventpage />;
            case "settings":
              return <Settings />;
            case "profile":
              return <ProfilePage {...this.props} />;
            case "org":
              return <OrgPage />;
            case "orgprofile":
              return <OrgProfile {...this.props} />;
            case "connections":
              return <UserProfile />;
            case "chats":
              return <ChatRoomList {...this.props} />;
            case "messages":
              return <Message {...this.props} />;
            case "survey":
              return <Checkout {...this.props} />;
            default:
              return <ProfilePage {...this.props} />;
          }
        })()}
      </div>
    );
  }
}

export default Dashboard;
