import React from "react";
import Box from "@mui/material/Box";
import { ChannelList } from "./ChannelList";
import "./Chat.scss";
import { MessagesPanel } from "./MessagesPanel";
import socketClient from "socket.io-client";

const SERVER = "http://localhost:3030";

export class Chat extends React.Component {
  state = {
    channels: null,
    socket: null,
    channel: null,
  };
  socket;
  componentDidMount() {
    this.loadChannels();
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(SERVER); //default auto to false for sign in
    var username = localStorage.getItem("username");
    socket.auth = { username };
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("connection", () => {
      if (this.state.channel) {
        this.handleChannelSelect(this.state.channel.id);
      }
    });
    socket.on("channel", (channel) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    });
    socket.on("message", (message) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            //if channel doesn't already have messages
            c.messages = [message];
          } else {
            //if channel does already have messages
            c.messages.push(message);
            console.log(message);
          }
        }
      });
      this.setState({ channels });
    });
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        user.hasNewMessages = false;
      });
      // put the current user first, and then sort by username
      this.users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });
    socket.on("user connected", (user) => {
      user.hasNewMessages = false;
      this.users.push(user);
    });

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
    });
    this.socket = socket;
  };

  loadChannels = async () => {
    fetch("http://localhost:3030/getChannels").then(async (response) => {
      let data = await response.json();
      this.setState({ channels: data.channels });
    });
  };

  handleChannelSelect = (id) => {
    let channel = this.state.channels.find((c) => {
      return c.id === id;
    });
    console.log(channel.history);
    this.setState({ channel });
    this.socket.emit("channel-join", id, (ack) => {});
  };

  handleSendMessage = (channel_id, text) => {
    this.socket.emit("send-message", {
      channel_id,
      text,
      senderName: localStorage.getItem("username"),
      id: Date.now(),
    });
  };

  render() {
    return (
      <Box marginTop={10}>
        <div className="chat-app">
          <ChannelList
            channels={this.state.channels}
            onSelectChannel={this.handleChannelSelect}
          />
          <MessagesPanel
            onSendMessage={this.handleSendMessage}
            channel={this.state.channel}
          />
        </div>
      </Box>
    );
  }
}

export default Chat;
