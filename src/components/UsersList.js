import React, { useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import "../styles/UsersList.css";
import CategorieUser from "./CategorieUser";
import { UserList } from "../datas/userList";

export default class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channelInfo: []
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentChannel!==this.props.currentChannel) {
            this.setState({
              channelInfo: this.props.channelList.find(channel => channel.id_channel===this.props.currentChannel)
            })
            console.log(this.state.channelInfo)
          
          }
        console.log(1)
    }
    render() {
        const channelName = this.state.channelInfo.channel_name
  return (
    <div className="user__list">
      <div className="user__list__top">
        <h2># {channelName}</h2>
      </div>
      <div className="user__list__top__icons">
        <SettingsIcon /> Mon profile
      </div>
      <CategorieUser UserList={UserList} />
    </div>
  );
    }
}

