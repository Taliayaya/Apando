import React, { Component } from "react";
import "../styles/Chat.css";
import Message from "./Message";
import { AddCircle } from "@material-ui/icons";
import axios from "axios";

const API_SEND_MESSAGE =
  "http://localhost/Project-Plateforme/src/php/send_message.php";
const API_LOAD_MESSAGES =
  "http://localhost/Project-Plateforme/src/php/load_messages.php";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      send_message: {
        user_id: JSON.parse(localStorage.getItem("user_data")).id,
        message: "",
        error: null,
        sent: false,
      },
      load_message: {
        loaded: false,
        messages_list: [],
        error: null,
      },
      activeChat: 0,
    };
    this.loadMessage = this.loadMessage.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.send_message.user_id);
    axios({
      method: "post",
      url: `${API_SEND_MESSAGE}`,
      headers: { "content-type": "application/json" },
      data: this.state.send_message,
    })
      .then((result) => {
        // On récupère les states d'avant, on les remets, et on les modifies
        console.log(result);
        this.setState((prevState) => ({
          send_message: {
            ...prevState.send_message,
            sent: result.data.sent,
            message: "",
          },
        }));
        // console.log(this.state.send_message.message);
      })
      .catch((error) =>
        this.setState((prevState) => ({
          send_message: {
            ...prevState.send_message,
            error: error.message,
          },
        }))
      );
  }

  loadMessage() {
    axios({
      method: "post",
      url: `${API_LOAD_MESSAGES}`,
      headers: { "content-type": "application/json" },
      data: this.state.load_message,
    })
      .then((result) => {
        // console.log(result);
        this.setState((prevState) => ({
          load_message: {
            ...prevState.loadMessage,
            loaded: result.data.loaded,
            messages_list: result.data.messages_list,
          },
        }));
        // console.log(result);
        // console.log(this.state);
      })
      .catch((error) =>
        this.setState((prevState) => ({
          load_message: {
            ...prevState.load_message,
            error: error.message,
          },
        }))
      );
  }

  // Montre les messages
  componentDidMount() {
    this.loadMessage();
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  // Reset la page à chaque fois qu'il y a une modifcation dans message_lists
  componentDidUpdate(prevProps, prevState) {
    let result = Object.is(
      prevState.load_message.messages_list,
      this.state.load_message.messages_list
    );
    if (result) {
      this.loadMessage();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="chat">
        {/* Chat Header ? */}
        {console.log(JSON.parse(localStorage.getItem("user_data")))}
        <div className="chat__messages">
          {this.state.load_message.messages_list
            .reverse()
            .map(({ id_message, message, message_date, pseudo }) => (
              <Message
                key={id_message}
                username={pseudo === null ? "Utilisateur supprimé" : pseudo}
                message={message}
                timestamp={message_date}
              />
            ))}
        </div>

        <div className="chat__input">
          <AddCircle fontSize="large" />
          <form>
            <input
              placeholder={`Ecrivez à tous`}
              type="text"
              value={this.state.send_message.message}
              onChange={(e) =>
                this.setState((prevState) => ({
                  send_message: {
                    ...prevState.send_message,
                    message: e.target.value,
                  },
                }))
              }
            />
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
