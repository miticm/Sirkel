import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChatRoomCard from "./ChatRoomCard";
import setAuthToken from "../utils/setAuthToken";
import axios from 'axios';

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  btn: {
    padding: "0",
    width: "60%"
  }
});

class ChatRoomList extends Component {
  state = {
    chatsList: []
  };

  getChatsList = () => {
    axios
      .get("http://127.0.0.1:5000/chats")
      .then(res => {
        console.log(res.data);
        this.setState({ chatsList: res.data.chatsData });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.getChatsList();
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="ChatRoomList">
        {
          this.state.chatsList.map((chat) => (
            <ChatRoomCard chat={chat} key={chat._id} />
          ))
        }
      </div>
    );
  }
}

ChatRoomList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ChatRoomList);
