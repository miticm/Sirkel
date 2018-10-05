import React, { Component } from "react";
import axios from "axios";

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
        if (res.data.success) {
          this.setState({
            allUsers: res.data.users
          });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        {this.state.allUsers.map(user => {
          return (
            <div>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <button>connect</button>
            </div>
          );
        })}
      </div>
    );
  }
}
