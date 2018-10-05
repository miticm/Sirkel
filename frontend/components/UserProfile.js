import React, { Component } from "react";
import Axios from "axios";

export default class UserProfile extends Component {
  state = {
    allUsers: []
  };
  getAllUsers = () => {
    Axios.get("http://127.0.0.1:5000/users")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        {this.state.allUsers.map(user => {
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>;
        })}
      </div>
    );
  }
}
