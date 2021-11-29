import React from "react";
import "../styles/App.css";
import ChannelList from "./ChannelList";
import Chat from "./Chat";
import Footer from "./Footer";
import Header from "./Header";
import LoginSignIn from "./LoginSignIn";
import UsersList from "./UsersList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      wantToSignIn: false,
      currentChannel:null,
      channel_list: []
    };
  }
  toggleOnline = () => {
    // Permet de mettre en ligne
    this.setState({ online: true });
  };
  // Permet de changer entre les différents salons
  changeChannel = (e, id_channel) => {
    this.setState({currentChannel: id_channel})
  }
  setChannelList = (channel_list) => {
    this.setState({channel_list: channel_list})
    console.log(channel_list)
    console.log('here');
  }
  componentDidMount() {
    if(localStorage.getItem('online')) {
      this.setState({
        online: true
      });
    }
  }

  render() {
    return (
      
      <div className="app">
        {this.state.online ? (
        
            <div>
              {/* <Header /> */}
              <div className="structure">
                {/* CHANNEL LIST*/}
                <ChannelList currentChannel={this.state.currentChannel}
                changeChannel={this.changeChannel}
                setChannelList={this.setChannelList} />

                {/* CHAT */}
                <Chat currentChannel={this.state.currentChannel}
                      channelList={this.state.channel_list} />

                {/* USERS LIST */}
                <UsersList channelList={this.state.channel_list}
                currentChannel={this.state.currentChannel} />
              </div>
              {/* FOOTER */}
              {/* <Footer /> */}
            </div>
    
        ) :
          <LoginSignIn online={this.state.online}
          toggleOnline={this.toggleOnline}/>
        }
      </div>
    );
  }
}

export default App;
