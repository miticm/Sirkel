import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class ProfilePage extends Component {
  state = {
    user: { orgsAdmin: [], connections: [] },
    events: []
  };
  componentDidMount() {
    this.getProfileData();
  }
  async getProfileData() {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    const profileRes = await axios.get("http://127.0.0.1:5000/users/profile");
    this.setState({
      user: profileRes.data.user
    });
    this.getEventData();
  }
  async getEventData() {
    const eventRes = await axios.get("http://127.0.0.1:5000/events");
    let posterEvents = eventRes.data.events.filter(e => {
      return e.poster.id == this.state.user._id;
    });
    this.setState({ events: posterEvents });
  }
  deleteEvent = id => {
    axios.delete(`http://127.0.0.1:5000/events/${id}`).then(res => {
      if (res.data.success) {
        this.getEventData();
      }
    });
  };
  dismissOrg = id => {
    console.log(id);
  };
  handleMessage = id => {
    let receivers = [this.state.user._id, id];
    axios
      .post("http://127.0.0.1:5000/chats/create", {
        receivers
      })
      .then(res => {
        if (res.data.success) {
          this.props.history.push(`/chats/${res.data.id}`);
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My username</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{this.state.user.username}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My email</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{this.state.user.email}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Organzations</Typography>
          </ExpansionPanelSummary>

          {this.state.user.orgsAdmin.map(org => {
            return (
              <Paper key={Math.random() * 100} style={{ margin: "2rem" }}>
                <h3>{org.orgname}</h3>
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => this.dismissOrg(org._id)}
                >
                  Leave
                </Button>
              </Paper>
            );
          })}
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My events</Typography>
          </ExpansionPanelSummary>

          {this.state.events.map(e => {
            return (
              <Paper key={Math.random() * 100} style={{ margin: "2rem" }}>
                <h3>{e.name.toUpperCase()}</h3>
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => this.deleteEvent(e._id)}
                >
                  Cancel
                </Button>
              </Paper>
            );
          })}
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My connections</Typography>
          </ExpansionPanelSummary>
          {this.state.user.connections.map(user => {
            return (
              <ExpansionPanelDetails key={Math.random() * 100}>
                <Typography>{user.username}</Typography>
                <button onClick={() => this.handleMessage(user.id)}>
                  Message
                </button>
              </ExpansionPanelDetails>
            );
          })}
        </ExpansionPanel>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
