import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import EventPost from "./EventPost";
export default class Eventpage extends Component {
  render() {
    return (
      <div>
        <CreateEvent />
        <EventPost />
      </div>
    );
  }
}
