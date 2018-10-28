import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
<<<<<<< HEAD
=======
import setAuthToken from "../utils/setAuthToken";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
>>>>>>> master

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
    username: "",
    email: ""
  };
  componentDidMount() {
    axios.get("http://127.0.0.1:5000/users/profile").then(res => {
      this.setState({
        username: res.data.user.username,
        email: res.data.user.email
      });
    });
<<<<<<< HEAD
  }
=======
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

>>>>>>> master
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My username</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{this.state.username}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My email</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{this.state.email}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
<<<<<<< HEAD
=======

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>My Organzations</Typography>
          </ExpansionPanelSummary>

          {this.state.user.orgsAdmin.map(org => {
            return (
              <Paper key={Math.random() * 100} style={{ margin: "2rem" }}>
                <h3>{org.orgname}</h3>
                <Button
                  className="navButton"
                  style={{ backgroundColor: "#60b0f4", color: "white" }}
                >
                  <Link to={`/org/${org.id}`}> Visit Page </Link>
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
>>>>>>> master
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
