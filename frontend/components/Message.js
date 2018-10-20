import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

export default class Message extends Component {
  render() {
    return (
      <Paper
        style={{ padding: "2rem", border: "1px solid black", width: "80%" }}
      >
        <TextField
          style={{ display: "block" }}
          label="Sender"
          value="message"
          margin="normal"
          variant="outlined"
        />
        <form action="">
          <Input />
          <Button>Send</Button>
        </form>
      </Paper>
    );
  }
}
