import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { Input, InputLabel, FormControl } from '@material-ui/core';

class UserProfile extends Component {
  state = {
    allUsers: [],
    filteredUsers: [],
    search: "",
    ranked: false
  };

  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    axios
      .get(`http://127.0.0.1:5000/users/${this.state.ranked ? "ranked" : ""}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            allUsers: res.data.users,
            filteredUsers: res.data.users
          });
        }
      })
      .catch(err => console.log(err));
  };

  onClick = id => {
    console.log(id);
    axios
      .post(`http://127.0.0.1:5000/users/${id}/add`)
      .then(res => {
        if (res.data.success) {
          this.getAllUsers();
        }
      })
      .catch(err => console.log(err));
  };

  handleKeyUp = e => {
    this.setState({ search: e.target.value }, () => {
      let filtered = this.state.allUsers.filter(user =>
        user.username.toLowerCase().includes(this.state.search.toLowerCase())
      );
      this.setState({ filteredUsers: filtered });
    });
  };

  toggleRanked = () => {
    this.setState({ ranked: !this.state.ranked }, () => {
      this.getAllUsers();
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl margin="normal" fullWidth>
          <InputLabel>
            <SearchIcon />
          </InputLabel>
          <Input
            placeholder="dan"
            onKeyUp={this.handleKeyUp}
          />
        </FormControl>
        <Button
          style={{ backgroundColor: "#60b0f4", color: "#ffffff" }}
          type="submit"
          multiple
          color="primary"
          onClick={this.toggleRanked}
        >
          Rank
        </Button>
        {this.state.filteredUsers.map(user => {
          let currentUserID = localStorage.getItem("userID");
          if (user._id !== currentUserID) {
            return (
              <Paper
                key={user._id + Math.random() * 100}
                className={classes.paper}
              >
                <div>
                  <h2 className={classes.title}>{user.username}</h2>
                  <p>{user.email}</p>
                  <p>Reputation: {user.reputation}</p>
                  <Button
                    style={{ backgroundColor: "#60b0f4", color: "white" }}
                    onClick={() => this.onClick(user._id)}
                  >
                    Connect
                  </Button>

                  <p>Connected with</p>
                  <ul>
                    {user.connections.map(user => {
                      return (
                        <p key={(Math.random() * 100) / Math.PI}>
                          {user.username}
                        </p>
                      );
                    })}
                  </ul>
                </div>
              </Paper>
            );
          }
        })}
      </div>
    );
  }
}
const styles = theme => ({
  bgc: {
    backgroundColor: "#60b0f4"
  },
  border: {
    border: "1px solid #60b0f4"
  },
  paper: {
    marginTop: 10,
    textAlign: "center",
    width: "95%",
    padding: `${theme.spacing.unit * (1 / 100)}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px`
  },
  title: {
    backgroundColor: "#60b0f4",
    textAlign: "center",
    color: "#ffffff",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0,
    width: "99%"
  }
});

export default withStyles(styles)(UserProfile);
