import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
export default class UserProfile extends Component {
  state = {
    allUsers: []
  };
<<<<<<< HEAD
=======

>>>>>>> master
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    axios
      .get("http://127.0.0.1:5000/users/")
      .then(res => {
        if (res.data.success) {
          this.setState({
            allUsers: res.data.users
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
  render() {
    return (
      <div>
<<<<<<< HEAD
        {this.state.allUsers.map(user => {
          return (
            <Paper key={user._id + Math.random() * 100}>
              <div>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <Button
                  style={{ backgroundColor: "#60b0f4" }}
                  onClick={() => this.onClick(user._id)}
                >
                  connect
                </Button>

                <p>Connected with</p>
                <ul>
                  {user.connections.map(user => {
                    return (
                      <li key={(Math.random() * 100) / Math.PI}>
                        {user.username}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Paper>
          );
=======
        <div className={classes.border}>
          <SearchIcon />
          <InputBase
            placeholder="  search user..."
            onKeyUp={this.handleKeyUp}
          />
        </div>
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
                  <Button
                    style={{ backgroundColor: "#60b0f4", color: "white" }}
                    onClick={() => this.onClick(user._id)}
                  >
                    connect
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
>>>>>>> master
        })}
      </div>
    );
  }
}
<<<<<<< HEAD
=======
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
    textAlign: "left",
    color: "#ffffff",
    padding: theme.spacing.unit * (1 / 2),
    marginBottom: 0,
    width: "99%"
  }
});

export default withStyles(styles)(UserProfile);
>>>>>>> master
