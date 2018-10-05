import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
export default class UserProfile extends Component {
  state = {
    allUsers: []
  };
  componentDidMount() {
    this.getAllUsers();
  }
  getAllUsers = () => {
    axios
      .get("http://127.0.0.1:5000/users/")
      .then(res => {
        console.log(res.data);
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
        console.log(res.data);
        if (res.data.success) {
          this.getAllUsers();
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
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
        })}
      </div>
    );
  }
}
