import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: "75px",
    marginBottom: "75px",
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
});

function OrganizationList(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="headline" className={classes.title}>
            List of Organizations
          </Typography>
          <Typography className={classes.post} variant="body1">
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
            Clubs Appear Here Clubs Appear Here Clubs Appear Here Clubs Appear Here
          </Typography>
          <Divider />
        </Paper>
      </main>
    </React.Fragment>
  );
}

OrganizationList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrganizationList);