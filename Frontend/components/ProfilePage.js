import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";


const styles = theme => ({

  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: 10,
    marginBottom: 10,
    width: 250,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },

  title: {
    backgroundColor: '#60b0f4',
    padding: theme.spacing.unit * (1/2),
    marginBottom: 0,
  },

  bigAvatar: {
    margin: 5,
    width: 60,
    height: 60,
  },

  submit: {
    margin: theme.spacing.unit,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
  },
});

function ProfilePage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="subheading"> John Doe </Typography>
          <Avatar
            alt="John Doe"
            src="../images/cliff.jpg"
            className={classes.bigAvatar}
            />
            <Typography>_________________________</Typography>
            <Typography variant="body1">
                About: I love learning to code it is the most fun thing in the world
            </Typography>
            <Typography>_________________________</Typography>
            <Typography variant="body1">
                Clubs: club1 club2 club3
            </Typography>
            <Button
              style={{ backgroundColor: '#60b0f4' }}
              type="submit"
              multiple
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Connect
            </Button>
            
        </Paper>
      </main>
    </React.Fragment>
  );
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);