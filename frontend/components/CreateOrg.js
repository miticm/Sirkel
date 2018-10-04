import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import axios from "axios";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
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

  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  title: {
    width: "100%",
    backgroundColor: "#60b0f4",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0
  }
});

class CreateOrg extends Component {
  state = {
    name: "",
    desc: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const org = {
      name: this.state.name,
      description: this.state.description
    };
    axios
      .post("http://127.0.0.1:5000/orgs", {
        org
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            name: "",
            description: ""
          });
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
              Create a new Organization
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Name of the Organization</InputLabel>
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Description</InputLabel>
                <Input
                  name="description"
                  multiline
                  value={this.state.description}
                  onChange={this.onChange}
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
}

CreateOrg.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateOrg);
