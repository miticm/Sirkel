import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Link, Route } from "react-router-dom";
import "./Navbar.css";


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
    marginRight: 0,
    marginBottom: 10
  },

  title: {
    backgroundColor: "#60b0f4",
    color: "#ffffff",
    textAlign: "center",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0,
    width: "100%"
  }
});

function OrgList(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="headline" className={classes.title}>
            {props.name}
          </Typography>
          <p>{props.description}</p>
          <Button className={classes.submit} style={{ backgroundColor: "#60b0f4", color: "white" }}>
            Join
          </Button>
          <Button className="navButton"
              style={{ backgroundColor: "#60b0f4", color: "white" }}>
              <Link to="/orgprofile"> Visit Page </Link>
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  );
}

OrgList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrgList);
