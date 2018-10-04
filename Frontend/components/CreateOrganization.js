import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: "75px",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function CreateOrganization(props) {
    const { classes } = props;
    
        return (
          <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="headline" className={classes.title}>
                Create a New Organization
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel>Oranization Name</InputLabel>
                  <Input
                    name="organizationName"
                    // value={this.state.event}
                    // onChange={this.onChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel>Description</InputLabel>
                  <Input
                    name="Description"
                    multiline
                    // value={this.state.event}
                    // onChange={this.onChange}
                  />
                </FormControl>
    
                <Button
                  style={{ backgroundColor: "#60b0f4" }}
                  type="submit"
                  multiple
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                >
                  Create
                </Button>
              </form>
            </Paper>
          </main>
        </React.Fragment>
        );
}

CreateOrganization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateOrganization);