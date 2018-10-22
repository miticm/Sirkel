import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export default class Message extends Component {
  state = {
    input: "",
    messages: []
  };
  timeoutID;
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.getMessage();
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }
  getMessage() {
    Axios.get(`http://127.0.0.1:5000/chats/${this.props.match.params.id}`).then(
      res => {
        if (res.data.success) {
          this.setState({ messages: res.data.messages });
        }
      }
    );
    this.timeoutID = setTimeout(() => this.getMessage(), 1000);
  }
  onClick = e => {
    let message = this.state.input;
    Axios.post(
      `http://127.0.0.1:5000/chats/addMessage/${this.props.match.params.id}`,
      {
        message
      }
    ).then(res => {
      if (res.data.success) {
        this.setState({ input: "" });
      }
    });
  };
  onChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    return (
      <Paper
        style={{ padding: "2rem", border: "1px solid black", width: "80%" }}
      >
        {this.state.messages.map(me => {
          return (
            <TextField
              key={me._id}
              style={{ display: "block" }}
              label={me.sender}
              value={me.content}
              margin="normal"
              variant="outlined"
            />
          );
        })}
        <div>
          <Input value={this.state.input} onChange={this.onChange} />
          <Button onClick={this.onClick}>Send</Button>
        </div>
      </Paper>
    );
  }
}
