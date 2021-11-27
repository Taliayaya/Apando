import React, { Component } from "react";
import "../styles/ChannelList.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";

const API_LOAD_CHANNELS =
  "http://localhost/Project-Plateforme/src/php/load_channels.php";
const API_ADD_CHANNEL =
  "http://localhost/Project-Plateforme/src/php/add_channel.php";

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      server_id: 1,
      load_channels: {
        server_id: 1,
        error: null,
        loaded: false,
        channels_list: [],
      },
      add_channel: {
        channel_name: "",
        error: null,
        added: false,
        server_id: 1,
      },
    };
    this.channelRef = React.createRef();
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Sommes-nous en train d’ajouter de nouveaux éléments à la liste ?
    // Sauvegardons la position de défilement pour la recaler plus tard.
    if (
      prevState.load_channels.channels_list.length <
      this.state.load_channels.channels_list.length
    ) {
      const list = this.channelRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  // Pour charger les différents salons d'un serveur
  loadChannels = () => {
    axios({
      method: "post",
      url: `${API_LOAD_CHANNELS}`,
      headers: { "content-type": "application/json" },
      data: this.state.load_channels,
    })
      .then((result) => {
        console.log(result);
        this.setState((prevState) => ({
          load_channels: {
            ...prevState.load_channels,
            loaded: result.data.loaded,
            channels_list: result.data.channels_data,
          },
        }));
      })
      .catch((error) =>
        this.setState((prevState) => ({
          load_channels: {
            ...prevState.load_channels,
            error: error.message,
          },
        }))
      );
  };

  // Pour ajouter un salon
  addChannel = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${API_ADD_CHANNEL}`,
      headers: { "content-type": "application/json" },
      data: this.state.add_channel,
    })
      .then((result) => {
        console.log(result);
        this.setState((prevState) => ({
          add_channel: {
            ...prevState.add_channel,
            added: result.data.added,
            channel_name: "",
          },
        }));
      })
      .catch((error) =>
        this.setState((prevState) => ({
          add_channel: {
            ...prevState.add_channel,
            error: error.message,
          },
        }))
      );
  };
  componentDidMount() {
    this.loadChannels();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.add_channel.added !== this.state.add_channel.added) {
      this.loadChannels();
      this.setState((prevProps) => ({
        add_channel: {
          ...prevProps.add_channel,
          added: false,
        },
      }));
    }
    if (snapshot != null) {
      const list = this.channelRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
  render() {
    return (
      <div className="channel__list">
        <div className="channel__list__top">
          <h2>Le Bon Sauveur</h2>
          <ExpandMoreIcon />
        </div>
        <form action="#">
          <input
            type="text"
            value={this.state.add_channel.channel_name}
            onChange={(e) =>
              this.setState((prevState) => ({
                add_channel: {
                  ...prevState,
                  channel_name: e.target.value,
                },
              }))
            }
            placeholder="Nouveau salon"
          ></input>
          <input
            type="submit"
            value="Ajouter"
            onClick={(e) => this.addChannel(e)}
          ></input>
        </form>
        <div className="channel__list__bottom" ref={this.channelRef}>
          {this.state.load_channels.channels_list.map(
            ({ id_channel, channel_name }) => (
              <div
                className={
                  // Attribue la classe selectionné ou normale en fonction de l'état du salon
                  ((this.props.currentChannel === id_channel && id_channel!==1)||(id_channel===1))
                    ? "selected_channel"
                    : "normal"
                }
                key={id_channel.toString()}
                onClick={(e) => this.state.changeChannel(e, id_channel)}
              >
                {channel_name}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default ChannelList;
