import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import EventPost from "./EventPost";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import InputBase from "@material-ui/core/InputBase";

export default class Eventpage extends Component {
  state = {
    eventsList: [],
    filteredEvents: [],
    search: ""
  };
  getEventsList = () => {
    axios
      .get("http://127.0.0.1:5000/events")
      .then(res => {
        console.log(res.data);
        this.setState({
          eventsList: res.data.events,
          filteredEvents: res.data.events
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getEventsList();
  }
  handleKeyUp = e => {
    this.setState({ search: e.target.value }, () => {
      let filtered = this.state.eventsList.filter(event =>
        event.name.toLowerCase().includes(this.state.search.toLowerCase())
      );
      this.setState({ filteredEvents: filtered });
    });
  };
  render() {
    return (
      <div>
        <div style={{ border: "1px solid #60b0f4" }}>
          <SearchIcon />
          <InputBase
            placeholder="  search event..."
            onKeyUp={this.handleKeyUp}
          />
        </div>
        <CreateEvent getEventsList={this.getEventsList} />
        {this.state.filteredEvents.map(e => {
          return (
            <EventPost
              key={e._id}
              name={e.name}
              desc={e.desc}
              date={e.date}
              id={e._id}
              getEventsList={this.getEventsList}
              attendees={e.attendees}
              poster={e.poster}
              hostBy={e.hostBy}
              upvotes={e.upvotes}
            />
          );
        })}
      </div>
    );
  }
}
