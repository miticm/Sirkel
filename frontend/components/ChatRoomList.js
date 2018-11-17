import React, { Component } from "react";
import ChatRoomCard from "./ChatRoomCard";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import serverAddress from "../utils/serverAddress";

export default class ChatRoomList extends Component {
  state = {
    chatsList: []
  };

  getChatsList = () => {
    axios
      .get(`${serverAddress}/chats`)
      .then(res => {
        console.log(res.data);
        this.setState({ chatsList: res.data.chatsList });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    this.getChatsList();
  }

  render() {
    return (
      <div className="ChatRoomList">
        {this.state.chatsList.map(chat => (
          <ChatRoomCard chat={chat} key={chat._id} {...this.props} />
        ))}
      </div>
    );
  }
}
