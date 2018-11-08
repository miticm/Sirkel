import React, { Component } from "react";
import Sidebar from "./Sidebar";
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
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

class Dashboard extends Component {
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.content, {
        [classes.contentShift]: this.props.open
        })} >
        <div className="dashboard">
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
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -240
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

});

export default withStyles(styles)(Dashboard);