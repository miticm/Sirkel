import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: "25px",
    marginBottom: "25px",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  replyField: {
    marginTop: 0,
    marginRight: 10,
    display: "fixed",
    flexDirection: "column",
    alignItems: "left",
    width: 460
  },

  submit: {
    margin: theme.spacing.unit,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0
  },

  title: {
    backgroundColor: "#60b0f4",
    textAlign: "center",
    color: "#ffffff",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0,
    width: "100%"
  }
});

class EventPost extends Component {
  onClick = e => {
    Axios.post(`http://127.0.0.1:5000/events/${this.props.id}/attend`)
      .then(res => {
        if (res.data.success) {
          this.props.getEventsList();
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline" className={classes.title}>
              {this.props.name}
            </Typography>
            <p>{this.props.desc}</p>
            <p>
              Date:
              {this.props.date}
            </p>
            <ul>
              {this.props.attendees.map(att => {
                return (
                  <li key={att.id + Math.random() * 100}>{att.username}</li>
                );
              })}
            </ul>
            <Button
              style={{ backgroundColor: "#60b0f4", color: "white" }}
              onClick={this.onClick}
            >
              Join
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

EventPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventPost);
