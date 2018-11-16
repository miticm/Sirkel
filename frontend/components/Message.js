import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import serverAddress from "../utils/serverAddress";
const styles = theme => ({ 
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
});

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
    Axios.get(`${serverAddress}/chats/${this.props.match.params.id}`).then(
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
      `${serverAddress}/chats/addMessage/${this.props.match.params.id}`,
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
    const currentLoginUser = localStorage.getItem("username");
    return (
      <Paper
        style={{ padding: "2rem", border: "1px solid black", width: "90%"}}
      >
        {this.state.messages.map(me => {
          let v;
          if(currentLoginUser == me.sender){
            v = "50%"
          } else{
            v = "0px"
          }
          
          var d = new Date(me.date);
          var n = d.toString();
          var l = n.slice(0, 24);

          return (
            <TextField
              fullWidth={true}
              key={me._id}
              style={{ display: "block", marginLeft:v, marginTop:"16px", marginBottom:"8px", width:"45%"}}
              label={me.sender + " -- " + l}
              value={me.content}
              variant="outlined"
              multiline  
            />
          );
        })}
        <div>
          <Input 
            style={{width:"40%", marginLeft: "50%"}}
            multiline value={this.state.input} 
            onChange={this.onChange}
          />
          <Button onClick={this.onClick}>Send</Button>
        </div>
      </Paper>
    );
  }
}
