import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

class UserProfile extends Component {
  state = {
    allUsers: [],
    filteredUsers: [],
    search: ""
  };
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    axios
      .get("http://127.0.0.1:5000/users/")
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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.border}>
          <SearchIcon />
          <InputBase placeholder="search user" onKeyUp={this.handleKeyUp} />
        </div>
        {this.state.filteredUsers.map(user => {
          return (
            <Paper key={user._id + Math.random() * 100}>
              <div>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <Button
                  className={classes.bgc}
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
  }
});

export default withStyles(styles)(UserProfile);
