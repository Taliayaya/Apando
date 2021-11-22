import React, { Component } from "react";
import "../styles/ChannelList.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class ChannelList extends Component {
  render() {
    return (
      <div className="channel__list">
        <div className="channel__list__top">
          <h2>Le Bon Sauveur</h2>
          <ExpandMoreIcon />
        </div>
      </div>
    );
  }
}

export default ChannelList;
