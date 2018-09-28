import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import UserPost from "../components/UserPost"

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: 10
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "fixed",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },

  postField: {
    marginTop: 0,
    marginRight: 10,
    display: "fixed",
    flexDirection: "column",
    alignItems: "left",
    width: 287,
  },

  submit: {
    margin: theme.spacing.unit,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },

  title: {
    backgroundColor: '#60b0f4',
    padding: theme.spacing.unit * (1/2),
    marginBottom: 0,
  },
});

function MainPage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="subheading"> Make a Post </Typography>
          <Divider/>
            <TextField
              id="standard-textarea"
              label="Write your post.."
              placeholder=""
              multiline
              className={classes.postField}
            margin="normal"
            />
            <Button
              style={{ backgroundColor: '#60b0f4' }}
              type="submit"
              multiple
              variant="raised"
              color="primary"
              size="mini"
              className={classes.submit}
            >
              Post
            </Button>
        </Paper>
        <UserPost />
      </main>
    </React.Fragment>
  );
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainPage);
