import React, { Component } from "react";
import CreateEvent from "./CreateEvent";
import EventPost from "./EventPost";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import InputBase from "@material-ui/core/InputBase";
import { Input, FormControl, InputLabel } from "@material-ui/core";
import serverAddress from "../utils/serverAddress";

export default class Eventpage extends Component {
  state = {
    eventsList: [],
    filteredEvents: [],
    search: ""
  };
  getEventsList = () => {
    axios
      .get(`${serverAddress}/events`)
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
        <FormControl margin="normal" fullWidth>
          <InputLabel>
            <SearchIcon />
          </InputLabel>
          <Input
            placeholder="Search Event..."
            onKeyUp={this.handleKeyUp}
          />
        </FormControl>
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
