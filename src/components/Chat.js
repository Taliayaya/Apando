import React, { Component } from "react";
import "../styles/Chat.css";
import Message from "./Message";
import { AddCircle } from "@material-ui/icons";
import axios from "axios";

const API_LOAD_MESSAGE = "http://localhost/Project-Plateforme/src/php/send_message.php";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 1,
      message: '',
      error: null,
      sent: false,
    }
  }
  resetMessage(){
    this.setState({
      message: ''
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${API_LOAD_MESSAGE}`,
      headers: {"content-type": "application/json"},
      data: this.state,
    })
    .then((result) => {
      this.setState({
        sent: result.data.sent,
        message: ''
      });

    
    })
    .catch((error) =>
    this.setState({
      error: error.message
    }));
    console.log(this.state);
  }
  render() {
    return (
      <div className="chat">
        {/* Chat Header ? */}
        <div className="chat__messages">
          <Message 
            avatar="https://i.pinimg.com/originals/9c/db/6b/9cdb6b5c751948d045322a3ded02b6ef.jpg" 
            username="taliayayah"
            message="lets go"
            timestamp="" />
          <Message />
          <Message />
          <Message />
        </div>

        <div className="chat__input">
          <AddCircle fontSize="large" />
          <form>
            <input 
            placeholder={`Ecrivez à tous`} 
            type="text" 
            value={this.state.message}
            onChange={(e) => this.setState({message: e.target.value})}/>
            <button
              className="chat__inputButton"
              onClick={(e) => this.handleSubmit(e)}
              type="submit"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
