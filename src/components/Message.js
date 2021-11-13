import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import "../styles/Message.css";

class Message extends Component {
  render() {
    return (
      <div className="message">
        <Avatar src="https://i.pinimg.com/originals/9c/db/6b/9cdb6b5c751948d045322a3ded02b6ef.jpg" />
        <div className="message__info">
          <h4>
            taliayayah
            <span className="message__timestamp">03-11-21</span>
          </h4>
          <p>Ettttt noussss sommmesssss partiiii</p>
        </div>
      </div>
    );
  }
}

export default Message;
