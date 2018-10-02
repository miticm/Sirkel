import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "flex",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 950,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "fixed",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    width: 584,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
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
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0
  },
  post: {}
});

function UserPost(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="subheading">
            {" "}
            John Doe posted on 9/27/18 at 8:58 PM{" "}
          </Typography>
          <Divider />
          <Typography className={classes.post} variant="body1">
            Events here Events hereEvents hereEvents hereEvents hereEvents
            hereEvents hereEvents hereEvents hereEvents hereEvents hereEvents
            hereEvents hereEvents hereEvents hereEvents hereEvents hereEvents
            hereEvents hereEvents hereEvents hereEvents hereEvents hereEvents
            hereEvents hereEvents hereEvents hereEvents hereEvents hereEvents
            hereEvents hereEvents hereEvents hereEvents hereEvents here
          </Typography>
          <Divider />
          <TextField
            id="standard-textarea"
            label="Reply.."
            placeholder=""
            multiline
            className={classes.replyField}
            margin="normal"
          />
          <Button
            style={{ backgroundColor: "#60b0f4" }}
            type="submit"
            multiple
            variant="raised"
            color="primary"
            className={classes.submit}
          >
            Reply
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  );
}

UserPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserPost);
