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
import setAuthToken from "../utils/setAuthToken";
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
  },
  close: {
    padding: theme.spacing.unit
  }
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    open: false,
    message: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/users/authenticate", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.data.success) {
          // Get the token
          const token = res.data.token;
          // Set token to localstorage
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("isAuth", true);
          localStorage.setItem("userID", res.data.user.id);
          setAuthToken(token);
          this.props.login();
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            message: res.data.msg,
            open: true,
            password: "",
            username: ""
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleClose = e => {
    this.setState({ open: false });
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
            <Typography variant="headline">Welcome</Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  name="username"
                  onChange={this.onChange}
                  value={this.state.username}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                className={classes.submit}
                style={{
                  backgroundColor: "#60b0f4",
                  color: "#fff"
                }}
              >
                Login
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
            message={<span id="message-id">{this.state.message}</span>}
          />
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
