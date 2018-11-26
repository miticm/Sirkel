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

class ChangePassword extends Component {
  state = {
    password: "",
    password2: "",
    open: false,
    message: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.password2 !== this.state.password) {
      this.setState({
        open: true,
        message: "passwords are not the same"
      });
      return;
    }
    axios
      .post('http://127.0.0.1:5000/users/reset/' + this.props.match.params.id, {
        password: this.state.password
      })
      .then(res => {
        if (res.data.success) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            message: res.data.msg,
            open: true,
            password: "",
            password2: ""
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
            <Typography variant="headline">Change Password</Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input
                  name="password"
                  onChange={this.onChange}
                  value={this.state.username}
                  type="password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  name="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
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
                Change Password
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

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangePassword);
