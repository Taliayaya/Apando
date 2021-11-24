import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import "../styles/Message.css";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }
  render() {
    return (
      <div className="message" key={this.state.key}>
        <Avatar src={this.state.avatar} />
        <div className="message__info">
          <h4>
            {this.state.username}
            <span className="message__timestamp">{this.state.timestamp}</span>
          </h4>
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default Message;
