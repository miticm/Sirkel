import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  layout: {
    width: 300,
    display: "block", // Fix IE11 issue.
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(700)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 12,
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

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    open: false
  };
  handleClose = e => {
    this.setState({ open: false });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.password2 !== this.state.password) {
      this.setState({
        open: true,
        password: "",
        password2: ""
      });
      return;
    }
    axios
      .post("http://127.0.0.1:5000/users/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          this.props.history.push("/login");
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
            <Avatar
              className={classes.avatar}
              style={{ backgroundColor: "#60b0f4" }}
            >
              <LockIcon style={{ backgroundColor: "#60b0f4" }} />
            </Avatar>
            <Typography variant="headline">New User</Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Username</InputLabel>
                <Input
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  type="password"
                />
              </FormControl>
              <Button
                style={{
                  backgroundColor: "#60b0f4",
                  color: "#fff"
                }}
                type="submit"
                fullWidth
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Two passwords don't match</span>}
          />
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
