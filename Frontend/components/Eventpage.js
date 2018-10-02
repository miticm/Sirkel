import React, { Component } from "react";
import CreatePost from "./CreatePost";
import UserPost from "./UserPost";
export default class Eventpage extends Component {
  render() {
    return (
      <div>
        <CreatePost />
        <UserPost />
      </div>
    );
  }
}
