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
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

class Dashboard extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      <div>
        <div 
            className="dashboard"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
        >
          <div className="dashboard-content" onClick={this.handleClose}>
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