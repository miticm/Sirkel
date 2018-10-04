import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import EventPost from "./EventPost";
import axios from "axios";
export default class Eventpage extends Component {
  state = {
    eventsList: []
  };
  getEventsList = () => {
    axios
      .get("http://127.0.0.1:5000/events")
      .then(res => {
        console.log(res.data);
        this.setState({ eventsList: res.data.events });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getEventsList();
  }
  render() {
    return (
      <div>
        <CreateEvent getEventsList={this.getEventsList} />
        {this.state.eventsList.map(e => {
          return (
            <EventPost
              key={e._id}
              name={e.name}
              desc={e.desc}
              date={e.date}
              id={e._id}
              getEventsList={this.getEventsList}
              attendees={e.attendees}
            />
          );
        })}
      </div>
    );
  }
}
